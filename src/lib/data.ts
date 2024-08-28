'use server'

import { openDb } from "./db";

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

export async function fetchBills(query: string, sortedBy: string = 'date_recent') {
    const db = await openDb();

    let dbQuery = `SELECT * FROM bills WHERE description LIKE '%${query}%' `;

    if (sortedBy == 'date_recent') {
        dbQuery += "ORDER BY due_date ASC";
    } else if (sortedBy == 'date_old') {
        dbQuery += "ORDER BY due_date DESC";
    } else if (sortedBy == 'paid') {
        dbQuery += "AND is_paid == 1";
    } else if (sortedBy == 'due') {
        dbQuery += "AND is_paid == 0";
    }

    console.log(dbQuery);

    try {
        const bills = await db.all(dbQuery);
        return bills;
    } catch (err) {
        console.error('Database Error:', err);
        return [];
    }  
    
}