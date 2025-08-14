import autoBind from 'auto-bind';
import AuthService from "./auth.service.js";
import {AuthMessages} from './auth.messages.js';
import {CookieNames} from "../../common/constant/cookie.enum.js";
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
            await this.#service.sendOTP(mobile)
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
            return res.cookie(CookieNames.AccessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV
            }).status(200).json({
                message: AuthMessages.LoginSuccessfully,
                token
            });
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie(CookieNames.AccessToken);
            sendSuccessResponse(res, 200, undefined, AuthMessages.LogoutSuccessfully)
        } catch (err) {
            next(err);
        }
    }

}

export default new AuthController();