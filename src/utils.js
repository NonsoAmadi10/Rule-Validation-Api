export const Response =(message,status, data, res, statusCode=200) => {
    return res.status(statusCode).send({
        message,
        status,
        data
    });
}

export const checkValidRequestBody =(obj)=> {
    const checkKey = Object.keys(obj);
    const validateRequest = checkKey.filter((keys) => keys !== 'data' && keys !== 'rule');

    return validateRequest;

}
export const isObj =(val)=> {
    return val === Object(val)
}
export const checkValidField =(field, data)=> {
    const itsObj = isObj(data);
    const itsArr = Array.isArray(data);
    if(!itsArr && isObj){
        return data.hasOwnProperty(field)
    }else{
        if (data != field){
            return data.includes(field);
        }else{
            return field == data;
        }
    }
    
}