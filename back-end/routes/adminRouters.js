import express from 'express';
import {getStudents, deleteStudent, UpdateStudent} from '../controllers/adminControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminAccess from '../middlewares/adminMiddelware.js';
import { pieChart, barChart } from '../controllers/adminControllers.js';
const admin = express.Router();

admin.get('/students', authMiddleware, adminAccess ,getStudents)
admin.delete('/students/:id', authMiddleware, adminAccess , deleteStudent)
admin.put('/students/:id', authMiddleware, adminAccess ,UpdateStudent)
admin.get('/course-enrollments', pieChart)
admin.get("/monthly-students", barChart)

export default admin;
