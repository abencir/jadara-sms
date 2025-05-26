import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
});

module.exports = mongoose.model('Group', groupSchema);