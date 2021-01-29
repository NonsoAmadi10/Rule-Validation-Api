export const Response =(message,status, data, res) => {
    return res.send({
        message,
        status,
        data
    });
}