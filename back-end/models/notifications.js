import mongoose from "mongoose";
import User from "./User.js";

const notifSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['event_created', 'event_updated', 'event_cancelled', 'first_login']
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    } 
}, { timestamps: true })

const Notification = mongoose.model('Notification', notifSchema);
export default Notification;