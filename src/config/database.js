import * as SQLite from 'expo-sqlite';

let db;

function getDb() {
    if (!db) {
        // The database file should be in the app's document directory, not relative path
        db = SQLite.openDatabase('../habits.sqlite');
        // If you want to log only once
        console.log('database connect');
    }
    return db;
}

export default getDb;