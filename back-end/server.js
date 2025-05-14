import express from "express";
import mongngoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const app = express()
app.use(express.json())

mongngoose.connect(process.env.PASSWORD_DB)
.then (() => {
    console.log('Conected Success')
}).catch((err)=>{
    console.log(err)
})
app.listen('3000', () => {
    console.log('Listening to port 3000')
})



