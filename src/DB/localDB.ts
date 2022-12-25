const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

export type TDataSet = {
    ticketNumber: number;
    uid: string;
    email: any;
    userId: any;
    reservedDateTime: any;
    transactionId: any;
}

export const getDB = () => new Promise<TDataSet[]>((resolve, reject) => {
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