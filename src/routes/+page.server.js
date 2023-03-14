import { connectToDatabase } from "$lib/server/db";

export const load = async ({ getClientAddress, fetch }) => {
    const db = await connectToDatabase();
    const collection = db.collection('profiles');
    const ip = getClientAddress();
    const response = await fetch(`https://ipinfo.io/${ip}`, { 
        method: "GET",
        headers: {
            "Authorization": "Bearer 36f08e0caf3a01",
            "User-Agent": "curl/x.y.z"
        }
    });
    console.log(collection);
    const ipinfo = await response.json();
    return {
        ip: ip,
        city: ipinfo.city,
        region: ipinfo.region,
        country: ipinfo.country,
        loc: ipinfo.loc,
        org: ipinfo.org,
        postal: ipinfo.postal
    };
}