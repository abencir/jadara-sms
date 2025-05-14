import express from 'express';
// import Admin from '../models/Admin';
import Student from '../models/Student.js';

const router = express.Router();

 router.post('/studentRegister', async (req,res) => {
    try{
        const student = await Student.create(req.body)
        res.status(201).json(student)
    }catch(err){
        res.status(400).send(err)
    }
});

export default router;
