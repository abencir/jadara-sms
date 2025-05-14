import mongoose from "mongoose";
import User from "./User.js";

const studentSchema = new mongoose.Schema({
    course : {
        type : String,
        enum : ['MERN Stack', 'Software Engineer'],
        required : true
    },

    group: {
        type : String,
        enum : ["Group 1", "Group 2", "Group 3", "Group 4"],
        required : true
    }
})

const Student = User.discriminator('Student', studentSchema)

export default Student