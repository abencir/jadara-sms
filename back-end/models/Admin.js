import mongoose from "mongoose";
import User from "./User.js";

const adminSchema = new mongoose.Schema({
    permissions:{
        type: [String],
        default : ['Full Access']
    }
})

const Admin = User.discriminator('Admin', adminSchema)

export default Admin