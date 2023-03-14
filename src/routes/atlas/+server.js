import { connectToDatabase } from "$lib/server/db";

export async function GET({ fetch, request })
{
    const db = await connectToDatabase();
    return new Response(JSON.stringify({ dbname: 'test', request }));
};

export async function POST({ fetch, request }) 
{
    const db = await connectToDatabase();
    const collection = db.collection('profiles');
    return new Response(JSON.stringify({}));
};