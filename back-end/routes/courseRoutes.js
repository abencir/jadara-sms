import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseByTitle,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';

const router = express.Router();

router.post('/createCourse', createCourse);         
router.get('/courses', getCourses);             
router.get('/course/:title', getCourseByTitle);       
router.put('/updateCourse/:title', updateCourse);        
router.delete('/deletCourse/:title', deleteCourse);     

export default router;
