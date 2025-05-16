// routes/authRoutes.js
import express from 'express';
import {
  studentRegister,
  adminRegister,
  login,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/studentRegister', studentRegister);
router.post('/adminRegister', adminRegister);
router.post('/login', login);

export default router;
