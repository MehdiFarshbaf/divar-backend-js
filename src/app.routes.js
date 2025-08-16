import {Router} from "express";

const router = Router()

// routes
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import categoryRoutes from "./modules/category/category.routes.js";
import optionRoutes from "./modules/option/option.routes.js";


router.use("/auth", authRoutes);
router.use("/user", userRoutes)
router.use("/category", categoryRoutes)
router.use("/option", optionRoutes)


export default router