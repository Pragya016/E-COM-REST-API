import { MongoClient } from "mongodb";

// const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5'
let client;
export function connectToMongodb(){
    MongoClient.connect(process.env.DB_URL).then( clientInstance => {
            client = clientInstance
            console.log('Mongodb is connected.')
        }).catch(err => console.log(err));
}

export function getDB() {
    return client.db();
}