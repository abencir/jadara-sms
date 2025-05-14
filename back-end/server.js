import express from "express";
import mongngoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import router from "./routes/userRoutes.js";

dotenv.config()
const app = express()
app.use(express.json())
app.use('/api/users', router)

mongngoose.connect(process.env.PASSWORD_DB)
.then (() => {
    console.log('Conected Success')
}).catch((err)=>{
    console.log(err)
})
app.listen('3000', () => {
    console.log('Listening to port 3000')
})





