import express from "express";
import connect from "./db/db";
import router from "./routes";
// import cors from "cors";
connect();
const app = express();
// app.use(cors);
app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Medium");
});

export default app;
