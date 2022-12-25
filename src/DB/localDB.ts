const { Storage } = require('@google-cloud/storage');
import data from '../../db.json'

const storage = new Storage();

export type TDB = {
    ticketNumber: number;
    uid: string;
    email: any;
    userId: any;
    reservedDateTime: any;
    transactionId: any;
}

let DB = [...data]

export const getDB = () => new Promise<TDB[]>((resolve, reject) => {
    let data = ''
    const dataReader = storage.bucket('brynaraffle').file('db.json').createReadStream();
    dataReader.on('data', (d) => data += d);
    dataReader.on('end', () => resolve(JSON.parse(data)))
    dataReader.on('error', (e) => {
        console.log("error", { e })
        reject(e)
    })
});

export const setDB = (newDB) => storage.bucket('brynaraffle').file('db.json').save(JSON.stringify(newDB))