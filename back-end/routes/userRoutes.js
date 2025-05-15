import express from 'express';
import Admin from '../models/Admin.js';
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

 router.post('/adminRegister', async (req,res) => {
    try{
        const admin = await Admin.create(req.body)
        res.status(201).json(admin)
    }catch(err){
        res.status(400).send(err)
    }
});

export default router;
