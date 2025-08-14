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
            sendErrorResponse(authorizationMessages.login, 401);
        }

        const data = await jwt.verify(token, process.env.JWT_SECRET);

        if (typeof data === "object" && "id" in data) {
            const user = await UserModel.findById(data.id, {otp: 0, updatedAt: 0, verifiedMobile: 0})
            console.log("user is  : ", user)
            if (!user) sendErrorResponse(authorizationMessages.notFoundAccount, 401);
            req.user = user;
            next()
        }
        sendErrorResponse(authorizationMessages.notFoundAccount, 401);
    } catch
        (error) {
        next(error);
    }
}