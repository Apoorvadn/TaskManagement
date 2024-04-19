import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Tasks', '1.0.0');
const useAPI = true;

export const getDataFromServer = async () => {
    const URL = 'https://6620b21f3bf790e070b05290.mockapi.io/api/v1/tasks'

    const res = await fetch(URL);
    const tasks = await res.json();
    return tasks;
}

export const getData = async (key: string): Promise<any> => {
    if (useAPI) {
        return getDataFromServer();
    }
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

export const setDataFromServer = async (data) => {
    const URL = 'https://6620b21f3bf790e070b05290.mockapi.io/api/v1/tasks'

    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const tasks = await res.json();
    return tasks;
}

export const setData = async (key: string, value: any): Promise<void> => {
    if (useAPI) {
        return setDataFromServer(value);
    }
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

export const deleteDataFromServer = async (id) => {
    const URL = `https://6620b21f3bf790e070b05290.mockapi.io/api/v1/tasks/${id}`;

    const res = await fetch(URL, {
        method: 'DELETE',
    });
}

export const deleteData = async (id: string): Promise<void> => {
    if (useAPI) {
        deleteDataFromServer(id);
    }
    try {
        await db.transactionAsync(async (tx) => {
            await tx.executeSqlAsync(`DELETE FROM Tasks WHERE id=${id}`);
        });
    } catch (error) {
        console.error('Error dropping table:', error);
    }
};

export const updateDataToServer = async (data, id) => {
    const URL = `https://6620b21f3bf790e070b05290.mockapi.io/api/v1/tasks/${id}`;

    const response = await fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const updatedData = await response.json();
    return updatedData;
};

export const updateData = async (task: any): Promise<void> => {
    if (useAPI) {
        updateDataToServer(task, task.id);
    }
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






