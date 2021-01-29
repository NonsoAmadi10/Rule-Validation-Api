import { successResponse } from './utils'
class LogicController {

    static info(req, res) {
        const myInfo = {
            name: "Amadi Justice Chinonso",
            github: "@NonsoAmadi10",
            email: "nonsoamadi@aol.com",
            mobile: "08086749490",
            twitter: "@jackhoudini__"
        };

        return successResponse("My Rule-Validation API", myInfo, res);
    }
}

export default LogicController;