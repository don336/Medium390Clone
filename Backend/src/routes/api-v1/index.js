import express from "express";
import userAuth from "./auth.js";
import userRoute from "./user.js";

const routers = express();
routers.use("/auth/user/", userAuth);
routers.use("/user/", userRoute)
export default routers;
