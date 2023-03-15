import { Router } from "express";
import apiv1Routes from "./api-v1/index.js";

const router = Router();

router.use("/api/v1", apiv1Routes);

export default router;
