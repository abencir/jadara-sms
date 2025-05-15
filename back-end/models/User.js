import mongoose from "mongoose";
import bcrypt from "bcrypt"

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



userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});


export default User