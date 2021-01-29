import { checkValidRequestBody, isObj} from './utils';



const checkEmpty = (input)=> {
    const re = /^$/;
    const testBody = re.test(input);
    return testBody;
  }

export const sanitizer =(req, res, next) => {
    const response = (message, code) => res.status(code).send({message, status: "error", data: null});
    

    const {rule, data } = req.body;
   
    /** Check if the required request body data are present  */
    if(!rule) return response('rule is required.', 400);
    if(!data) return response('data is required.', 400);

    /**Check if the rule field is an object type */
    if(!isObj(rule)) return response('rule should be an object.', 400)


    /** Check for invalid payload */
    const validRequestBody = checkValidRequestBody(req.body);
    if(validRequestBody.length > 0) return response('Invalid JSON payload passed.', 400)
    const { field, condition, condition_value } = rule;
      
      /** Validate the rule fields */
      if (checkEmpty(field)) return response('field is required in the rule object.', 400);
      if (checkEmpty(condition)) return response('condition is required in the rule object.',400);
      if (checkEmpty(condition_value)) return response('condition value is required in the rule object.',400);
    return next();
    
}

