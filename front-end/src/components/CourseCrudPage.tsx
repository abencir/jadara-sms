import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

type Course = {
  id: number;
  title: string;
  description: string;
};

const CourseCrudPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<Omit<Course, "id"> & { id: number | null }>({
    id: null,
    title: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  const saveCourses = (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing && formData.id !== null) {
      const updated = courses.map((course) =>
        course.id === formData.id ? { ...formData, id: course.id } : course
      );
      saveCourses(updated);
      setIsEditing(false);
    } else {
      const newCourse: Course = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
      };
      saveCourses([...courses, newCourse]);
    }

    setFormData({ id: null, title: "", description: "" });
  };

  const handleEdit = (course: Course) => {
    setFormData(course);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const updated = courses.filter((course) => course.id !== id);
      saveCourses(updated);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Course" : "Add New Course"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEditing ? "Update Course" : "Add Course"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Course List</h3>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <table className="w-full border border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border p-2">{course.id}</td>
                <td className="border p-2">{course.title}</td>
                <td className="border p-2">{course.description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-yellow-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseCrudPage;
