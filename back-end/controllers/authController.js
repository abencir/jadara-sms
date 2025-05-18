// controllers/authController.js
import User from '../models/User.js';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import { tokenGenerate } from '../utils/jwt.js';
import { createNotif } from './notifController.js';

// ========== REGISTER STUDENT =============== //
export const studentRegister = async (req, res) => {
  const { email } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (isExist) return res.status(400).send('Email already exists');
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ========== REGISTER ADMIN =============== //
export const adminRegister = async (req, res) => {
  const { email } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (isExist) return res.status(400).send('Email already exists');
    const newAdmin = await Admin.create(req.body);
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ========== LOGIN =============== //
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, isExist.password);
    if (!isMatch) return res.status(400).send('Incorrect password');

    if (isExist.firstLogin) {
      await createNotif({
        userId: isExist._id,
        type: 'first_login',
        message: `Welcome to the platform, ${isExist.name}! We're excited to have you here. Explore your dashboard to get started 🚀.`,
        isRead: false,
      });
      isExist.firstLogin = false;
      await isExist.save();
    }

    const token = tokenGenerate(isExist);
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: {
        id: isExist._id,
        name: isExist.name,
        email: isExist.email,
        role: isExist.role,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
