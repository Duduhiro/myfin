'use server'

import { openDb } from "./db";
import { FetchBillsResult, FinancialData } from "./types/dashboard";

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

export async function fetchIncomeXExpense() {
    const db = await openDb();

    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 6) {
        month += 12;
        year -= 1;
    }

    month -= 5;

    let strmonth = '';

    if (month < 10) {
        strmonth = `0${month}`;
    } else {
        strmonth = `${month}`;
    }

    const querydate = `${year}-${strmonth}-01`;

    interface IncomeExpenseData {
        [key: string]: {income?: number, expenses?: number};
    }

    try {
        console.log(querydate)

        const incomeExpenseData: IncomeExpenseData = {};

        for 

        const income = await db.all(`SELECT date, amount FROM income WHERE date >= '${querydate}' ORDER BY date ASC`);
        const expenses = await db.all(`SELECT date, amount FROM expenses WHERE date >= '${querydate}' ORDER BY date ASC`);

        console.log(income)
        console.log(expenses)

        income.forEach((item) => {
            const date = item.date.split('-')[1];
            if (!incomeExpenseData[date]) {
                incomeExpenseData[date] = {};
            }
            incomeExpenseData[date].income = item.amount;
        })

        expenses.forEach((item) => {
            const date = item.date.split('-')[1];
            if (!incomeExpenseData[date]) {
                incomeExpenseData[date] = {};
            }
            incomeExpenseData[date].expenses = item.amount;
        })

        console.log(incomeExpenseData)

        return incomeExpenseData;

    } catch (err) {
        console.error('Database Error:', err);
        return {income: [], expenses: []};
    }

    
}