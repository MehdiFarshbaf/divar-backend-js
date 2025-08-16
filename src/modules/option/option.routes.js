import {Router} from "express";
import optionController from "./option.controller.js";

const router = Router();

router.post("/", optionController.create);
router.get("/by-category/:id", optionController.findByCategoryId);
router.get("/:id", optionController.findById);
router.get("/", optionController.find);

export default router;