import express from "express";
import mongngoose from "mongoose";
import dotenv from "dotenv";
import EventRoutes from './routes/EventRoutes.js'
import courseRoutes from './routes/courseRoutes.js';
import adminrouters from "./routes/adminRouters.js";
import router from "./routes/authRouters.js";

dotenv.config()
const app = express()
app.use(express.json())
app.use('/api', router);
app.use('/api', EventRoutes);
app.use('/api', courseRoutes);
app.use('/api/admin', adminrouters);
 

mongngoose.connect(process.env.PASSWORD_DB)
.then (() => {
    console.log('Conected Success')
}).catch((err)=>{
    console.log(err)
})

app.use('/api', EventRoutes);

app.listen('3000', () => {
    console.log('Listening to port 3000')
})



