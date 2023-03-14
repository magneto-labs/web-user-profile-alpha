export const load = async (event) => {
    const getClientAddress = event.getClientAddress
    const ip = getClientAddress()
    console.log(event);
    return {
        ip: ip
    };
}