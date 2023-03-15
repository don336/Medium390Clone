import {Router} from "express";
import UserController from "../../controllers/user.js";
import validate from "../../middleware/validate.js";

const baseRouter = Router();

baseRouter.post("/signup", validate.userRegistration, UserController.registerUser);
baseRouter.post("/signin", validate.signIn, UserController.signIn);
baseRouter.post("/signout", UserController.signOut);

export default baseRouter;
