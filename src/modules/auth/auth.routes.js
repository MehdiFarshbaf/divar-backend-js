import {Router} from "express";
import authController from "./auth.controller.js";
import {authorization} from "../../common/guard/authorization.guard.js";

const router = Router();

router.post('/send-otp', authController.sendOTP)
router.post('/check-otp', authController.checkOTP);
router.get('/logout', authorization, authController.logout);

export default router;