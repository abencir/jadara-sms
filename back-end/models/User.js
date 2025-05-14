import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    isActive: Boolean,
    role: {
      type: String,
      enum: ['admin', 'student'],
      required: true,
    },
  },
  { discriminatorKey: 'role' }
);

const User = mongoose.model('User',userSchema)

export default User