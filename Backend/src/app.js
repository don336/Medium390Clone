import express from "express";
import {errors} from "celebrate"
import connect from "./db/db";
connect()
const app  = express()
app.use(errors)
app.use(express.json)

app.get('/', (req, res)=>{
    return res.status(200).send('Welcome to Medium')
})

export default app;

