import autoBind from "auto-bind";
import userService from "./user.service.js";
import {sendSuccessResponse} from "../../common/responses.js";

class UserController {
    #service;

    constructor() {
        autoBind(this)
        this.service = userService;
    }

    async whoami(req, res, next) {
        try {
            const user = req.user;
            sendSuccessResponse(res, 200, {user})
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();