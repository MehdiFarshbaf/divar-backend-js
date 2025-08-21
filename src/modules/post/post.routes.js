import {Router} from "express";
import postController from "./post.controller.js";

const router = Router();

router.get("/", postController.findPost)
router.post("/", postController.createPost)
router.get("/:id", postController.findPostById)
router.put("/:id", postController.updatePost)
router.delete("/:id", postController.deletePost)


export default router;