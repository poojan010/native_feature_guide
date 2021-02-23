import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name : 'places.db'});

export const init = () => {

    const promise = new Promise((resolve,reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS places ( id INTEGER PRIMARY KEY NOT NULL , title TEXT NOT NULL , imageUri TEXT NOT NULL , address TEXT NOT NULL , lat REAL NOT NULL , lng REAL NOT NULL );",
                [],
                () => { 
                    resolve(); 
                },
                (err) => {
                    reject(err);
                }
            );
        });
    })
    return promise;
}

export const insertPlace = (title,imageUri,address,lat,lng) => {

    const promise = new Promise((resolve,reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO places (title,imageUri,address,lat,lng) VALUES (?,?,?,?,?);",
                [title,imageUri,address,lat,lng],
                (_,result) => { 
                    resolve(result); 
                },
                (err) => {
                    reject(err);
                }
            );
        });
    })
    return promise;
}

export const fetchPlaces = () => {

    const promise = new Promise((resolve,reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM places",
                [],
                (tx, data) => {
                    var result = [];
                    for (let i = 0; i < data.rows.length; i++) {
                      result.push(data.rows.item(i));
                    }
                    resolve(result);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    })
    return promise;
}