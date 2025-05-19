import Student from "../models/Student.js";

export const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).json(students)
    }catch(err){
        res.status(500).send('server error' + err)
    }
}

export const deleteStudent = async (req, res) =>{
    try{
        const toDelete = await Student.findByIdAndDelete(req.params.id)

        if(!toDelete){
            res.status(404).send('Student id not found')
        }
        res.send('Student deleted Successfuly')
    }catch(err){
        res.send(err + 'Error in delete student')
    }
}

export const UpdateStudent = async (req,res) => {
    try{
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        if (!updated){
            res.status(404).send('Student id not found')
        }
        res.json(updated)
    }catch(err){
        res.send(err + 'Error in Update')
    }
}
