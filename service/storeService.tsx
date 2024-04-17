import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
import { resolve } from 'path';

const db = SQLite.openDatabase('Tasks', '1.0.0');



export const getData = async (key: string): Promise<any> => {
    try {
        return new Promise(async (resolve) => {
            await db.transactionAsync(async (tx) => {
                const result = tx.executeSqlAsync('SELECT * FROM Tasks');
                resolve((await result).rows);
            })
        })
    } catch (e) {
        console.error(e)
    }
}

export const setData = async (key: string, value: any): Promise<void> => {
    try {
        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(
                'INSERT INTO Tasks (id, title, description, dueDate, isCompleted) VALUES (?, ?, ?, ?, ?)',
                [value.id, value.title, value.description, value.dueDate, value.isCompleted]
            );
        })
    } catch (e) {
        console.error(e);
    }
}

export const deleteData = async (id: string): Promise<void> => {
    try {
        await db.transactionAsync(async (tx) => {
            await tx.executeSqlAsync(`DELETE FROM Tasks WHERE id=${id}`);
        });
    } catch (error) {
        console.error('Error dropping table:', error);
    }
};


export const updateData = async (task: any): Promise<void> => {
    try {
        await db.transactionAsync(async (tx) => {
            await tx.executeSqlAsync(`UPDATE Tasks
            SET title = '${task.title}',
            description = '${task.description}',
            dueDate = '${task.dueDate}',
            isCompleted = ${task.isCompleted}
            WHERE id=${task.id}`);
        });
    } catch (error) {
        console.error('Error dropping table:', error);
    }
};

export const initDB = async () => {
    // await db.transactionAsync(async (tx) => {
    //     await tx.executeSqlAsync('DROP TABLE Tasks')
    // });
    await db.transactionAsync(async tx => {
        tx.executeSqlAsync(
            `CREATE TABLE IF NOT EXISTS Tasks (
              id int NOT NULL,
              title TEXT NOT NULL,
              description TEXT NOT NULL,
              dueDate TEXT NOT NULL,
              isCompleted int NOT NULL
            )`
        );
    });

}






