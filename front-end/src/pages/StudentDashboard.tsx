// studentdashboard.tsx
import CoursesList from "@/components/CoursList";
import EventsSection from "@/components/EventSection";

export default function StudentDashboard() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Dashboard</h1>

      {/* Courses Section */}
      <CoursesList />

      {/* Events Section */}
      <EventsSection />
    </div>
  );
}
