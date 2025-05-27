import Student from "../models/Student.js";
import User from "../models/User.js";
import course from "../models/course.js";

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


export const pieChart = async (req, res) => {
  try {
    
    const result = await User.aggregate([
      { $match: { role: "Student" } }, 
      {
        $group: {
          _id: "$course",  
          count: { $sum: 1 }
        }
      }
    ]);
        
    const courseIds = result.map(item => item._id); 

   
    const courses = await course.find({ _id: { $in: courseIds } });
    const final = result.map(item => {
     
      const course = courses.find(c => c._id.toString() === item._id.toString());
      return {
        name: course ? course.title : "Unknown",  
        value: item.count
      };
    });

   
    res.json(final);

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const barChart =  async (req, res) => {
  try {
    const data = await Student.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, 
          students: { $sum: 1 }, 
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formatted = data.map((item) => ({
      month: monthNames[item._id - 1],
      students: item.students,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching monthly student stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};