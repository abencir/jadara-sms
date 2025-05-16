import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseByTitle,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';

const router = express.Router();

router.post('/course', createCourse);         
router.get('/course', getCourses);             
router.get('/course/:title', getCourseByTitle);       
router.put('/course/:title', updateCourse);        
router.delete('/course/:title', deleteCourse);     

export default router;
