import {sendErrorResponse} from "../responses.js";
import {authorizationMessages} from "../messages/auth.messages.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../../modules/user/user.model.js";

dotenv.config();

export const authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;

        if (!token) {
            sendErrorResponse(res, 401, authorizationMessages.login);
        }

        const data = await jwt.verify(token, process.env.JWT_SECRET);

        if (typeof data === "object" && "id" in data) {
            const user = await UserModel.findById(data.id, {otp: 0, updatedAt: 0, verifiedMobile: 0})
            console.log("user is  : ", user)
            if (!user) sendErrorResponse(res, 401, authorizationMessages.notFoundAccount);
            req.user = user;
            next()
        }
        sendErrorResponse(res, 401, authorizationMessages.notFoundAccount);
    } catch
        (error) {
        next(error);
    }
}