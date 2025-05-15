import mongoose from 'mongoose';


const { Schema, model } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  studentsEnrolled: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default model('Course', courseSchema);

