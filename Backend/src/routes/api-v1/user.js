import express from "express";
import UserController from "../../controllers/user";
import { checkAuth } from "../../middleware/checkAuth";
import user from "../../model/user";
const userRoute = express();

userRoute.get("/:username", checkAuth, UserController.getUserProfile);
userRoute.put("/:username",checkAuth, UserController.updateUserProfile)

export default userRoute;
