import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import EventRoutes from './routes/eventRoutes.js'
import courseRoutes from './routes/courseRoutes.js';
<<<<<<< HEAD
import adminrouters from "./routes/adminRouters.js";
import router from "./routes/authRouters.js";
=======
import router from "./routes/userRoutes.js";
import notifRoutes from "./routes/notifRoutes.js"
>>>>>>> faa4d64fbdb05adf4ff54b2ea2edf0dde4c4b55a

dotenv.config()

const app = express()

app.use(express.json())
<<<<<<< HEAD
app.use('/api', router);
app.use('/api', EventRoutes);
app.use('/api', courseRoutes);
app.use('/api/admin', adminrouters);
 

mongngoose.connect(process.env.PASSWORD_DB)
=======
app.use('/api/users', router);
app.use('/api/events', EventRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notifications', notifRoutes);

mongoose.connect(process.env.PASSWORD_DB)
>>>>>>> faa4d64fbdb05adf4ff54b2ea2edf0dde4c4b55a
.then (() => {
    console.log('Conected Successfully')
}).catch((err)=>{
    console.log('DB Connection error:', err)
})

app.listen('3000', () => {
    console.log('Listening to port 3000')
})



