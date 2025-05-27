import React, { useEffect, useState } from "react";
import Calendar from "@/components/ui/calendar";

type Event = {
  _id: string;
  title: string;
  startDate: string; // ISO string from backend
  endDate: string;
};

export default function EventsCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:5000/api/events");
    const data = await res.json();
    setEvents(data);
  };

  // Filter events where startDate matches selected calendar date
  const eventsForDate = events.filter(
    (event) => new Date(event.startDate).toDateString() === date.toDateString()
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <Calendar selected={date} onSelect={setDate} />
      </div>
      <div>
        <h2>Events on {date.toDateString()}</h2>
        {eventsForDate.length > 0 ? (
          <ul>
            {eventsForDate.map((event) => (
              <li key={event._id}>
                <strong>{event.title}</strong> <br />
                From: {new Date(event.startDate).toLocaleTimeString()} <br />
                To: {new Date(event.endDate).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this date.</p>
        )}
      </div>
    </div>
  );
}
