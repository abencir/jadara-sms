import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseButton from "./CoursButton";

type User = {
  course: string;
};

type Course = {
  _id: string;
  title: string;
  description?: string;
};

export default function CoursesList() {
  const [, setUser] = useState<User | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchUserAndCourse = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Fetch user data
        const userRes = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = userRes.data;
        console.log("User Data:", userData);
        setUser(userData);

        // If user has a course assigned, fetch the course details
        if (userData.course) {
          const courseRes = await axios.get(
            `http://localhost:5000/api/courses/id/${userData.course}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Course Data:", courseRes.data);
          setCourse(courseRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch user or course info:", err);
      }
    };

    fetchUserAndCourse();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-yellow-400 my-6">
        {course ? `Welcome to ${course.title}` : ''}
      </h1>

      <h2 className="text-lg font-semibold mb-3">Courses</h2>

      <div className="space-y-3">
        <CourseButton
          title="HTML"
          subLinks={[
            {
              label: "Lesson 1: HTML Introduction",
              url: "https://www.w3schools.com/html/html_intro.asp",
            },
            {
              label: "Lesson 2: HTML Editors",
              url: "https://www.w3schools.com/html/html_editors.asp",
            },
            {
              label: "Lesson 3: HTML Basic Examples",
              url: "https://www.w3schools.com/html/html_basic.asp",
            },
          ]}
        />
        <CourseButton
          title="CSS"
          subLinks={[
            {
              label: "Lesson 1: CSS Introduction",
              url: "https://www.w3schools.com/css/css_intro.asp",
            },
            {
              label: "Lesson 2: CSS Syntax",
              url: "https://www.w3schools.com/css/css_syntax.asp",
            },
            {
              label: "Lesson 3: CSS Selectors",
              url: "https://www.w3schools.com/css/css_selectors.asp",
            },
          ]}
        />
        <CourseButton
          title="JavaScript"
          subLinks={[
            {
              label: "Lesson 1: JS Introduction",
              url: "https://www.w3schools.com/js/js_intro.asp",
            },
            {
              label: "Lesson 2: JS Syntax",
              url: "https://www.w3schools.com/js/js_syntax.asp",
            },
            {
              label: "Lesson 3: JS Variables",
              url: "https://www.w3schools.com/js/js_variables.asp",
            },
          ]}
        />
      </div>
    </div>
  );
}
