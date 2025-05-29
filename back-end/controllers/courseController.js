import Course from '../models/course.js';


export const createCourse = async (req, res) => {
  try {
    const course = req.body;
    const newCourse = new Course(course);
    await newCourse.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getCourseByTitle = async (req, res) => {
    const courseTitle = req.params.title
  try {
    const course = await Course.findOne({title: courseTitle});
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateCourse = async (req, res) => {
    const updateCourse = req.params.title
  try {
    const updated = await Course.findOneAndUpdate(
      {title :updateCourse},
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Course not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
    const deletCourse = req.params.title
  try {
    const deleted = await Course.findOneAndDelete({title :deletCourse });
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
