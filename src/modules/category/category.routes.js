import {Router} from "express";
import categoryController from "./category.controller.js";

const router = Router()

router.post("/", categoryController.createCategory)
router.get("/", categoryController.find)

export default router