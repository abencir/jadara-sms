import mongoose from "mongoose";
import bcrypt from "bcrypt"

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type : String,
      required : true
    },
    email: String,
    password: String,
    isActive: Boolean,
    role: {
      type: String,
      enum: ['admin', 'student'],
      required: true,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
  },
  { discriminatorKey: 'role',
    timestamps : true
   }
);


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

const User = mongoose.model('User',userSchema)
export default User
