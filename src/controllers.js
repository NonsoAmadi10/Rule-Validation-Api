import { Response, checkValidField } from './utils';
import _ from 'underscore-contrib';

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
        const erresponse = (message, code) => res.status(code).send({message, status: "error", data: null});
        const {rule, data} = req.body;
        const {field, condition, condition_value} = rule;
    
        
        
        let requiredDataField;
        /** check if the field in the rule object is a nested object or not*/
         if(field.match(/\./)) {
            const splitWord = field.split('.');
            
            /** The nesting should not be more than two levels */
            if(splitWord.length > 3){
                return erresponse(`field ${field} nesting should not be more than two levels.`, 400)
            }
         let required = _.getPath(data, field);
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

         requiredDataField = data[0] || data; 
         }

         /** The condition value to run the rule against */

         
        
        
        return res.send({})
    }
}

export default LogicController;