import _ from 'underscore-contrib';

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
    return val === Object(val) && !Array.isArray(val)
}
export const checkValidField =(field, data)=> {
    const itsObj = isObj(data);
    const itsArr = Array.isArray(data);
    
    if(!itsArr && data!=field && isObj){
        return data.hasOwnProperty(field)
    }
    
    // if (itsArr && !isObj && data != field){
    //     return data.includes(field);
    // }

    if(!itsArr && !itsObj && data == field) return field == data;

    return data.includes(field)
    
}

export const getObjValue =(obj, required)=> _.getPath(obj, required);