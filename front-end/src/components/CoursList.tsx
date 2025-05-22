import CourseButton from "./CoursButton";
export default function CoursesList (){
  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-yellow-400 my-6">Mern Stack</h1>
      <h2 className="text-lg font-semibold mb-3">Cours</h2>
      <div className="space-y-3">
      <CourseButton
  title="HTML"
  subLinks={[
    { label: 'Lesson 1: HTML Introduction', url: 'https://www.w3schools.com/html/html_intro.asp' },
    { label: 'Lesson 2: HTML Editors', url: 'https://www.w3schools.com/html/html_editors.asp' },
    { label: 'Lesson 3: HTML Basic Examples', url: 'https://www.w3schools.com/html/html_basic.asp' },
  ]}
/>
      <CourseButton
  title="CSS"
  subLinks={[
    { label: 'Lesson 1: HTML Introduction', url: 'https://www.w3schools.com/html/html_intro.asp' },
    { label: 'Lesson 2: HTML Editors', url: 'https://www.w3schools.com/html/html_editors.asp' },
    { label: 'Lesson 3: HTML Basic Examples', url: 'https://www.w3schools.com/html/html_basic.asp' },
  ]}
/>      <CourseButton
  title="JavaScript"
  subLinks={[
    { label: 'Lesson 1: HTML Introduction', url: 'https://www.w3schools.com/html/html_intro.asp' },
    { label: 'Lesson 2: HTML Editors', url: 'https://www.w3schools.com/html/html_editors.asp' },
    { label: 'Lesson 3: HTML Basic Examples', url: 'https://www.w3schools.com/html/html_basic.asp' },
  ]}
/>
      </div>
    </div>
  );
};