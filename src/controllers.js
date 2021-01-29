import { Response, checkValidField } from './utils';
import _ from 'lodash';

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
            requiredDataField = _.get(data, field);
         }else {
        /** extract the required field from the data object so that you can compare */
            requiredDataField = field
         }

         /** check if the field specified in the rule object is missing from the data passed */
        
        if(!requiredDataField && !checkValidField(field, data)) return erresponse(`field ${field} is missing from data.`, 400);
         console.log(requiredDataField)
        
        
        
        return res.send({})
    }
}

export default LogicController;