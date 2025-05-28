import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, MapPinIcon } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<Event, "_id">>({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const token = localStorage.getItem("authToken") || "your-auth-token";

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(console.error);
  }, []);

  const handleAddOrUpdateEvent = () => {
    if (!newEvent.title.trim() || !newEvent.location.trim() || !newEvent.startDate || !newEvent.endDate) {
      alert("Please fill in Title, Location, Start Date and End Date.");
      return;
    }
    if (new Date(newEvent.startDate) > new Date(newEvent.endDate)) {
      alert("Start Date cannot be after End Date.");
      return;
    }

    if (editingId !== null) {
      fetch(`http://localhost:5000/api/events/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      })
        .then(res => res.ok ? res.json() : Promise.reject("Failed to update event"))
        .then(updatedEvent => {
          setEvents(events.map(e => e._id === editingId ? updatedEvent : e));
          setEditingId(null);
          setNewEvent({ title: "", description: "", location: "", startDate: "", endDate: "" });
        })
        .catch(err => alert(err));
    } else {
      fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      })
        .then(res => res.ok ? res.json() : Promise.reject("Failed to create event"))
        .then(data => {
          setEvents([...events, data.event]);
          setNewEvent({ title: "", description: "", location: "", startDate: "", endDate: "" });
        })
        .catch(err => alert(err));
    }
  };

  const handleEditEvent = (event: Event) => {
    setNewEvent({
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: event.startDate.slice(0, 10),
      endDate: event.endDate.slice(0, 10)
    });
    setEditingId(event._id);
  };

  const handleDeleteEvent = (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to delete event"))
      .then(() => setEvents(events.filter(e => e._id !== id)))
      .catch(err => alert(err));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">{editingId ? "Edit Event" : "Create New Event"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event Title"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={newEvent.location}
                onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Location"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={newEvent.startDate} onChange={e => setNewEvent({ ...newEvent, startDate: e.target.value })} />
            </div>
            <div>
              <Label>End Date</Label>
              <Input type="date" value={newEvent.endDate} onChange={e => setNewEvent({ ...newEvent, endDate: e.target.value })} />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Event description..."
            />
          </div>
          <Button onClick={handleAddOrUpdateEvent} className="w-full">
            {editingId ? "Update Event" : "Add Event"}
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Event List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.length === 0 ? <p>No events yet. Add one!</p> : (
            <ul className="space-y-4">
              {events.map(event => (
                <li key={event._id} className="border p-4 rounded-lg flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p>{event.description}</p>
                    <p className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" />{event.location}</p>
                    <p className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" />{event.startDate.slice(0,10)} to {event.endDate.slice(0,10)}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event._id)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
