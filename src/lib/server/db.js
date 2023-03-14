import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://test:ulalP4Ui025zZ3FE@cluster0.rlmayxm.mongodb.net/?retryWrites=true&w=majority";

export async function connectToDatabase() {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('test');
    return db;
}