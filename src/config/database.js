import * as SQ from 'expo-sqlite'
let dbPromise;
export default async function getDB() {
    if(!dbPromise) {
        dbPromise = await SQ.openDatabaseAsync('../../habits.db')
    }
    return dbPromise
}
