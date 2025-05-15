import express from 'express';
import Admin from '../models/Admin.js';
import Student from '../models/Student.js';
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import {tokenGenerate} from '../utils/jwt.js'


const router = express.Router();

// ========== REGISTER ROUTS =============== //
 router.post('/studentRegister', async (req,res) => {
     const {email} = req.body;
    try{
        const isIxist = await User.findOne({email}) ;

        if (isIxist){
            return res.status(400).send('Wrong email or password')
        }


        const newStudent = await Student.create(req.body)
        res.status(201).json(newStudent);
    }catch(err){
        res.status(500).send(err)
    }
});

 router.post('/adminRegister', async (req,res) => {
    const {email} = req.body;
    try{
        const isIxist = await User.findOne({email})
        if (isIxist){
            return res.status(400).send('Wrong email or password')
        }
        const newAdmin = await Admin.create(req.body)
        res.status(201).json(newAdmin) 
    }catch(err){
        res.status(400).send(err)
    }
});


// =========== LOGIN ROUT ========//

router.post('/login', async (req,res) => {
    const {email, password} = req.body;

    try{
        const isIxist = await User.findOne({email})
        if (!isIxist){
           return res.status(400).send('Sira 3end inak')
        }

        const isMatch = await bcrypt.compare(password,isIxist.password)
        if (isMatch) {
            const token = tokenGenerate(isIxist);
            res.status(200).json({
                messege: 'Merhba biiik', token,
                isIxist : {
                    id : isIxist._id,
                    name : isIxist.name,
                    email : isIxist.email,
                    role : isIxist.role
                }

            })


        }else{
            res.status(500).send('Sira 3end inak')
        }
    }catch(err){
        res.status(400).send(err)
    }
});

















export default router;
