import {Router} from "express";
import optionController from "./option.controller.js";

const router = Router();

router.post("/", optionController.create);
router.get("/by-category/:id", optionController.findByCategoryId);
router.get("/by-category-slug/:slug", optionController.findOptionsByCategorySlug);
router.get("/:id", optionController.findById);
router.delete("/:id", optionController.deleteOptionById);
router.get("/", optionController.find);
router.put("/:id", optionController.update);

export default router;