export const successResponse =(message, data, res) => {
    return res.send({
        message,
        status: "success",
        data
    });
}