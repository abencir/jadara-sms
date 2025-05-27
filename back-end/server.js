import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import EventRoutes from "./routes/EventRoutes.js";
import courseRoutes from './routes/courseRoutes.js';
import router from "./routes/authRouters.js";
import notifRoutes from "./routes/notifRoutes.js"
import admin from "./routes/adminRouters.js";
import cors from "cors";

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json());
app.use('/api/users', router);
app.use('/api/events', EventRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notifications', notifRoutes);
app.use('/api/dashboard', admin)

mongoose.connect(process.env.PASSWORD_DB)
.then (() => {
    console.log('Conected Successfully')
}).catch((err)=>{
    console.log('DB Connection error:', err)
})

app.listen('5000', () => {
    console.log('Listening to port 5000')
})



