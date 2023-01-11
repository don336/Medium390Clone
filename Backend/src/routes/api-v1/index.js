import express from "express";
import userAuth from "./auth.js";
import userRoute from "./user.js";
import articleRoute from './article'

const routers = express();
routers.use("/auth/user/", userAuth);
routers.use("/user/", userRoute)
routers.use("/articles/", articleRoute)

export default routers;
