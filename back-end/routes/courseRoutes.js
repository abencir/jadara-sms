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

router.post('/', authMiddleware, adminAccess ,createCourse);         
router.get('/', getCourses);             
router.get('/:title',authMiddleware, getCourseByTitle);       
router.put('/:title', authMiddleware, adminAccess,updateCourse);        
router.delete('/:title', authMiddleware, adminAccess,deleteCourse);     

export default router;
