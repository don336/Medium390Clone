import express from "express";
import UserController from "../../controllers/user";
import { checkAuth } from "../../middleware/checkAuth";
import user from "../../model/user";
const userRoute = express();

userRoute.get("/:id", checkAuth, UserController.getUserProfile);
userRoute.put("/:id",checkAuth, UserController.updateUserProfile)

export default userRoute;
