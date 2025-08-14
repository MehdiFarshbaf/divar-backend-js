import autoBind from "auto-bind";
import UserModel from './../user/user.model.js';
import {sendErrorResponse} from "../../common/responses.js";
import {AuthMessages} from "./auth.messages.js";
import {randomInt} from 'crypto'
import jwt from "jsonwebtoken";

class AuthService {
    #model

    constructor() {
        autoBind(this)
        this.#model = UserModel
    }

    async sendOTP(mobile) {
        const user = await this.#model.findOne({mobile})
        const now = new Date().getTime()

        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000 * 60 * 2)  //2 minutes
        }

        if (!user) {
            return this.#model.create({mobile, otp})
        }

        if (user.otp && user.otp.expiresIn > now) {
            sendErrorResponse(AuthMessages.OtpCodeNotExpired)
        }


        user.otp = otp
        await user.save()

        return user
    }

    async checkOTP(mobile, code) {

        const user = await this.checkUserExistByMobile(mobile)
        const now = new Date().getTime()
        if (user.otp && user.otp.expiresIn < now) {
            sendErrorResponse(AuthMessages.OtpCodeExpired, 422)
        }
        if (user.otp.code !== code) {
            sendErrorResponse(AuthMessages.OtpCodeIsIncorrect, 422)
        }
        if (!user.verifiedMobile) {
            user.verifiedMobile = true
            await user.save()
        }
        // return access token
        return await this.signToken({mobile, id: user._id},)
    }

    async logout() {
    }

    async checkUserExistByMobile(mobile) {
        const user = await this.#model.findOne({mobile})
        if (!user) {
            sendErrorResponse(AuthMessages.NotFoundUserByMobile)
        } else {
            return user
        }
    }

    async signToken(payload) {
        // 1000*60*60*24*365
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1y"})
    }
}

export default new AuthService();