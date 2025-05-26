import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseByTitle,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminAccess from '../middlewares/adminMiddelware.js';

const router = express.Router();

router.post('/course', authMiddleware, adminAccess ,createCourse);         
router.get('/course', getCourses);             
router.get('/course/:title',authMiddleware, getCourseByTitle);       
router.put('/course/:title', authMiddleware, adminAccess,updateCourse);        
router.delete('/course/:title', authMiddleware, adminAccess,deleteCourse);     

export default router;
