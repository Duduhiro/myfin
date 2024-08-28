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

export async function fetchBills(query: string, sortedBy: string = 'due_date') {
    const db = await openDb();

    if (query == "") {
        try {
            const bills = await db.all(`SELECT * FROM bills ORDER BY ${sortedBy}`);
            return bills;
        } catch (err) {
            console.error('Database Error:', err);
            return [];
        }    
    } else {
        query = "%" + query + "%";
        try {
            const bills = await db.all(`SELECT * FROM bills WHERE description LIKE '${query}' ORDER BY ${sortedBy}`);
            return bills;
        } catch (err) {
            console.error('Database Error:', err);
            return [];
        }
    }

    
}