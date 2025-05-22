import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { subDays } from "date-fns";

const EventsSection = () => {
  const filters = ['Today', 'Last 8 days', 'Last month'];
  const [active, setActive] = useState('Today');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Update selected date based on filter
  const handleFilterClick = (label: string) => {
    setActive(label);

    const today = new Date();
    switch (label) {
      case 'Today':
        setSelectedDate(today);
        break;
      case 'Last 8 days':
        setSelectedDate(subDays(today, 8));
        break;
      case 'Last month':
        setSelectedDate(subDays(today, 30));
        break;
      default:
        break;
    }
  };

  return (
    <div className="mt-[75px] flex items-center justify-center">
  <div className="w-full border rounded-2xl p-4 shadow-sm">
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-4">Events</h2>

      <div className="flex justify-center space-x-2 mb-4">
        {filters.map((label) => (
          <button
            key={label}
            onClick={() => handleFilterClick(label)}
            className={`px-3 py-1 rounded-full text-sm transition border text-center ${
              active === label
                ? "bg-blue-100 text-blue-600 border-blue-500"
                : "text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-blue-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className=" max-w-md rounded-md border"
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default EventsSection;
