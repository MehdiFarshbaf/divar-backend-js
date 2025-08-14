import autoBind from 'auto-bind';
import AuthService from "./auth.service.js";
import {AuthMessages} from './auth.messages.js';
import {sendSuccessResponse} from "../../common/responses.js";

class AuthController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = AuthService;
    }

    async sendOTP(req, res, next) {
        try {
            const {mobile} = req.body
            const result = await this.#service.sendOTP(mobile)
            res.json({
                message: AuthMessages.sendOTPSuccessFully
            })
        } catch (err) {
            next(err);
        }
    }

    async checkOTP(req, res, next) {
        try {
            const {mobile, code} = req.body
            const token = await this.#service.checkOTP(mobile, code)
            sendSuccessResponse(res, 200, {token}, AuthMessages.LoginSuccessfully)
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController();