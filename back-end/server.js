import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import EventRoutes from './routes/eventRoutes.js'
import courseRoutes from './routes/courseRoutes.js';
import router from "./routes/userRoutes.js";
import notifRoutes from "./routes/notifRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use('/api/users', router);
app.use('/api/events', EventRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notifications', notifRoutes);

mongoose.connect(process.env.PASSWORD_DB)
.then (() => {
    console.log('Conected Successfully')
}).catch((err)=>{
    console.log('DB Connection error:', err)
})

app.listen('3000', () => {
    console.log('Listening to port 3000')
})



