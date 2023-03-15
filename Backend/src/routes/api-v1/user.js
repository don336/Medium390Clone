import { Router } from "express";
import UserController from "../../controllers/user.js";
import { checkAuth } from "../../middleware/checkAuth.js";
// import user from "../../model/user.js";
const userRoute = Router();

userRoute.get("/:username", checkAuth, UserController.getUserProfile);
userRoute.put("/:username", checkAuth, UserController.updateUserProfile);

export default userRoute;
