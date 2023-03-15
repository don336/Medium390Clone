import { Router } from "express";
import userAuth from "./auth.js";
import userRoute from "./user.js";
import articleRoute from "./article.js";

const apiv1Routes = Router();
apiv1Routes.use("/auth/user/", userAuth);
apiv1Routes.use("/user/", userRoute);
apiv1Routes.use("/articles/", articleRoute);

export default apiv1Routes;
