import express from 'express';
import {getStudents, deleteStudent, UpdateStudent} from '../controllers/adminControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminAccess from '../middlewares/adminMiddelware.js';
const router = express.Router();

router.get('/students', authMiddleware, adminAccess ,getStudents)
router.delete('/students/:id', authMiddleware, adminAccess , deleteStudent)
router.put('/students/:id', authMiddleware, adminAccess ,UpdateStudent)

export default router;
