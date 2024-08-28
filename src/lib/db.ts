'use server'

import sqlite3, { Database } from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
    return open({
        filename: './myfin.db',
        driver: sqlite3.Database
    });
}