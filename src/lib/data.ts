'use server'

import exp from "constants";
import { openDb } from "./db";
import { FetchBillsResult, FinancialData, DataPoint } from "./types/dashboard";

export async function fetchUsers() {
    
    const db = await openDb();
    
    try {
        const users = await db.all('SELECT * FROM users');
        return users;
    } catch (err) {
        console.error('Database Error:', err);
        return [];
    }
}

export async function fetchBills(query: string, sortedBy: string = 'date_recent', page: number): Promise<FetchBillsResult> {
    const db = await openDb();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const offset = (page - 1) * 5;

    let dbQuery = `FROM bills WHERE due_date >= '${todayStr}' AND description LIKE '%${query}%' `;

    let dbQuery_sorted = '';

    if (sortedBy == 'date_recent' || sortedBy == '') {
        dbQuery_sorted = "ORDER BY due_date ASC";
    } else if (sortedBy == 'date_old') {
        dbQuery_sorted = "ORDER BY due_date DESC";
    } else if (sortedBy == 'paid') {
        dbQuery_sorted = "AND is_paid == 1";
    } else if (sortedBy == 'due') {
        dbQuery_sorted = "AND is_paid == 0";
    }

    dbQuery += ` ${dbQuery_sorted} LIMIT 5 OFFSET ${offset}`;

    try {
        const bills = await db.all('SELECT * ' + dbQuery);
        const billsCount = await db.get(`SELECT COUNT(*) FROM bills where due_date >= '${todayStr}' AND description LIKE '%${query}%' ` + dbQuery_sorted);
        return {bills, count: billsCount['COUNT(*)']};
    } catch (err) {
        console.error('Database Error:', err);
        return {bills: [], count: 0};
    }  
    
}

export async function fetchDashboard() {
    const db = await openDb();

    const dashboardData: FinancialData = {income_value: 0, expense_value: 0, balance: 0, savings: 0};

    try {
        const income_value_total = await db.get('SELECT SUM(amount) FROM income WHERE user_id = 1');
        const expense_value_total = await db.get('SELECT SUM(amount) FROM expenses WHERE user_id = 1');

        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const monthStr = month < 10 ? `0${month}` : `${month}`;
        const today = `${year}-${monthStr}-01`;

        const income_value_month = await db.get(`SELECT SUM(amount) FROM income WHERE user_id = 1 AND date >= '${today}'`);
        const expense_value_month = await db.get(`SELECT SUM(amount) FROM expenses WHERE user_id = 1 AND date >= '${today}'`);

        dashboardData.income_value = income_value_month['SUM(amount)'];
        dashboardData.expense_value = expense_value_month['SUM(amount)'];
        dashboardData.balance = income_value_total['SUM(amount)'] - expense_value_total['SUM(amount)'];
        dashboardData.savings = dashboardData.income_value - dashboardData.expense_value;

        return dashboardData;
    } catch (err) {
        console.error('Database Error:', err);
        return dashboardData;
    }
}

export async function fetchIncomeXExpense(): Promise<DataPoint[]> {
    const db = await openDb();

    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let strmonth = '';

    if (month < 10) {
        strmonth = `0${month}`;
    } else {
        strmonth = `${month}`;
    }

    const querydate_limit = `${year}-${strmonth}-01`;

    if (month < 6) {
        month += 12;
        year -= 1;
    }

    month -= 6;

    if (month < 10) {
        strmonth = `0${month}`;
    } else {
        strmonth = `${month}`;
    }

    const querydate = `${year}-${strmonth}-01`;

    interface IncomeExpenseData {
        [key: number]: {income?: number, expenses?: number};
    }

    try {

        const incomeExpenseData: IncomeExpenseData = {};

        for (let i = 0; i < 6; i++) {
            incomeExpenseData[month] = {income: 0, expenses: 0};
            month++;
            if (month > 12) {
                month = 1;
                year++;
            }
        }

        const income = await db.all(`SELECT date, amount FROM income WHERE date >= '${querydate}' AND date < '${querydate_limit}' ORDER BY date ASC`);
        const expenses = await db.all(`SELECT date, amount FROM expenses WHERE date >= '${querydate}' AND date < '${querydate_limit}' ORDER BY date ASC`);

        income.forEach((item) => {
            const date = item.date.split('-')[1];
            incomeExpenseData[Number(date)].income += item.amount;
        })

        expenses.forEach((item) => {
            const date = item.date.split('-')[1];
            incomeExpenseData[Number(date)].expenses += item.amount;
        })

        const chartData: DataPoint[] = [];
        const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        for (let key in incomeExpenseData) {
            chartData.push({
                month: months[key], 
                income: incomeExpenseData[key].income || 0, 
                expense: incomeExpenseData[key].expenses || 0
            });
        }

        return chartData;

    } catch (err) {
        console.error('Database Error:', err);
        return [];
    }

}

export async function fetchLastMonthExpenses() {
    const db = await openDb();

    const date = new Date();
    let last_month = date.getMonth();
    let this_month = date.getMonth() + 1;
    let year = date.getFullYear();

    let last_strmonth = '';

    if (last_month < 10) {
        last_strmonth = `0${last_month}`;
    } else {
        last_strmonth = `${last_month}`;
    }

    let strmonth = '';

    if (this_month < 10) {
        strmonth = `0${this_month}`;
    } else {
        strmonth = `${this_month}`;
    }

    const querydate_last = `${year}-${last_strmonth}-01`;
    const querydate = `${year}-${strmonth}-01`;

    const colors = ['#fb7185', '#fb923c', '#bef264', '#2dd4bf', '#60a5fa',]

    try {
        const expenses = await db.all(`SELECT SUM(amount) AS amount, 
        categories.name AS category 
        FROM expenses 
        JOIN categories 
        ON expenses.category_id = categories.category_id
        WHERE date >= '${querydate_last}'
        AND date < '${querydate}'
        GROUP BY expenses.category_id 
        ORDER BY SUM(amount) DESC;
        `);

        const chartData = expenses.map((item, index) => {
            return {
                category: item.category,
                amount: item.amount,
                fill: colors[index]
            }
        });

        return chartData;
    } catch (err) {
        console.error('Database Error:', err);
        return [];
    }
}

export async function fetchSpendingLimits() {
    const db = await openDb();

    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    try {
        const spendingLimits = await db.all(`SELECT limit_amount FROM spending_limits WHERE month = ${month} AND year = ${year}`);
        return spendingLimits;
    } catch (err) {
        console.error('Database Error:', err);
        return [];
    }
}

export async function fetchThisMonthExpenses() {
    const db = await openDb();

    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let strmonth = '';

    if (month < 10) {
        strmonth = `0${month}`;
    } else {
        strmonth = `${month}`;
    }

    const querydate = `${year}-${strmonth}-01`;

    const thisMonthExpense = {'total': 0, 'expense': 'expense', 'fill': '#9333ea'};

    try {
        const expenses = await db.all(`SELECT SUM(amount) FROM expenses WHERE date >= '${querydate}'`);

        if (expenses.length == 0 || expenses[0]['SUM(amount)'] == null) {
            return [thisMonthExpense];
        }

        thisMonthExpense['total'] = expenses[0]['SUM(amount)'];

        return [thisMonthExpense];
    } catch (err) {
        console.error('Database Error:', err);
        return [];
    }
}