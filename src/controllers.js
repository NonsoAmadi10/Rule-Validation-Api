import { Response, checkValidField,getObjValue, isObj } from './utils';


class LogicController {

    static info(req, res) {
        const myInfo = {
            name: "Amadi Justice Chinonso",
            github: "@NonsoAmadi10",
            email: "nonsoamadi@aol.com",
            mobile: "08086749490",
            twitter: "@jackhoudini__"
        };

        return Response("My Rule-Validation API",'success', myInfo, res);
    }

    static validateRule(req, res){
        const erresponse = (message,code=400, data=null) => res.status(code).send({message, status: "error", data});
        const {rule, data} = req.body;
        const {field, condition, condition_value} = rule;
    
        let requiredDataField;
        /** check if the field in the rule object is a nested object or not*/
         if(!Number(field) && typeof field == 'string' && field.match(/\./)) {
            const splitWord = field.split('.');
            
            /** The nesting should not be more than two levels */
            if(splitWord.length > 3){
                return erresponse(`field ${field} nesting should not be more than two levels.`, 400)
            }
         let required = getObjValue(data, field);
         /**Incase of gramatival error like 'mission.cat' instead of 'missions.cat' you want to still throw a missing field error */
         if (required !== undefined){
             requiredDataField = required
         }else{
           return erresponse(`field ${field} is missing from data.`, 400)  
         }
            console.log(requiredDataField, field)
         }else {
       
         /** check if the field specified in the rule object is missing from the data passed */
        
        if(!checkValidField(field, data)) return erresponse(`field ${field} is missing from data.`, 400);
         /** extract the required field from the data object so that you can compare */
            if(isObj(data)){
                console.log(isObj(data))
                requiredDataField = getObjValue(data, field);
            }else{
         requiredDataField = typeof data =="array" ? data.toString() : data; 
         }
        }

         /** Create a Javascript Object that handles the comparison*/
         const operators = {
             'gte': function(a, b) { return a >= b},
              'gt': function(a, b) { return a > b},
              'neq': function(a,b){ return a!= b},
              'eq': function(a,b){ return a == b},
              'contains': function(a, b) { return String(a).indexOf(String(b))}
              
         }

            const responseData = (error, field, field_value, condition, condition_value) => {
                return {
                    validation: {
                        error,
                        field,
                        field_value,
                        condition,
                        condition_value
                    }
                }
            }
         /** Compare the value and return the result */
          if(operators[condition](requiredDataField, condition_value)){
              const validData = responseData(false, field, requiredDataField, condition, condition_value);
              return Response(`field ${field} successfully validated.`, 'success', validData, res, 200);
          }else{
        
        const errData = responseData(true, field, requiredDataField, condition, condition_value);
        return erresponse(`field ${field} failed validation.`,  400, errData);
    }
}
}

export default LogicController;