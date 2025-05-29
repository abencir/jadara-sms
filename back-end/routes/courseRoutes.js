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

router.post('/',createCourse);         
router.get('/', getCourses);             
router.get('/:title',getCourseByTitle);       
router.put('/:title',  updateCourse);        
router.delete('/:title',deleteCourse);     

export default router;
