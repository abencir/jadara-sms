import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

type Course = {
  _id?: string;
  title: string;
  description: string;
};

const API_BASE = "http://localhost:5000/api/courses";

const CourseCrudPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<Course>({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing && editId ? `${API_BASE}/${editId}` : API_BASE;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit course");

      setFormData({ title: "", description: "" });
      setIsEditing(false);
      setEditId(null);
      fetchCourses();
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  const handleEdit = (course: Course) => {
    setFormData({ title: course.title, description: course.description });
    setEditId(course._id || null);
    setIsEditing(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
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
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
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
                    onClick={() => handleDelete(course._id)}
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
