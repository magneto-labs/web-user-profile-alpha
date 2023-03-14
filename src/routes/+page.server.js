import { connectToDatabase } from "$lib/server/db";

export const load = async (event) => {
    const db = await connectToDatabase();
    const collection = db.collection('profiles');
    const getClientAddress = event.getClientAddress
    const ip = getClientAddress()
    console.log(event.ua);
    console.log(collection);
    return {
        ip: ip
    };
}