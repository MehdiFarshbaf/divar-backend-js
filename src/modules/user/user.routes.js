import {Router} from "express";
import userController from "./user.controller.js";
import {authorization} from "../../common/guard/authorization.guard.js";

const router = Router()
router.get("/whoami", authorization, userController.whoami)
export default router