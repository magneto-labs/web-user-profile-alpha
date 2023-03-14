export const load = async (event) => {
    const getClientAddress = event.getClientAddress
    const ip = await getClientAddress()
    console.log(ip);
    console.log(event);
}