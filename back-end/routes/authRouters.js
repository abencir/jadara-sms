import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  studentRegister,
  adminRegister,
  login,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/studentRegister', studentRegister);
router.post('/adminRegister', adminRegister);
router.post('/login', login);
router.get('/me', authMiddleware,(req, res) => {
  res.json(req.user);
});

export default router;
