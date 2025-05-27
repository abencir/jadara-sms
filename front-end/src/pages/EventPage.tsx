import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarIcon, MapPinIcon } from "lucide-react"

interface Event {
  title: string
  description: string
  location: string
  startDate: string
  endDate: string
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: ""
  })
  const [editingTitle, setEditingTitle] = useState<string | null>(null)

  // TODO: Replace with your actual auth token retrieval logic
  const token = "YOUR_AUTH_TOKEN_HERE"

  // Load events from backend on component mount
  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(console.error)
  }, [])

  const handleAddOrUpdateEvent = () => {
    if (
      !newEvent.title.trim() ||
      !newEvent.location.trim() ||
      !newEvent.startDate ||
      !newEvent.endDate
    ) {
      alert("Please fill in Title, Location, Start Date and End Date.")
      return
    }
    if (new Date(newEvent.startDate) > new Date(newEvent.endDate)) {
      alert("Start Date cannot be after End Date.")
      return
    }

    if (editingTitle !== null) {
      // Update event
      fetch(`/api/events/${encodeURIComponent(editingTitle)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to update event")
          return res.json()
        })
        .then(updatedEvent => {
          setEvents(events.map(e => (e.title === editingTitle ? updatedEvent : e)))
          setEditingTitle(null)
          setNewEvent({ title: "", description: "", location: "", startDate: "", endDate: "" })
        })
        .catch(err => alert(err.message))
    } else {
      // Create new event
      fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to create event")
          return res.json()
        })
        .then(createdEvent => {
          setEvents([...events, createdEvent])
          setNewEvent({ title: "", description: "", location: "", startDate: "", endDate: "" })
        })
        .catch(err => alert(err.message))
    }
  }

  const handleEditEvent = (title: string) => {
    const event = events.find(e => e.title === title)
    if (event) {
      setNewEvent({
        title: event.title,
        description: event.description,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate
      })
      setEditingTitle(title)
    }
  }

  const handleDeleteEvent = (title: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    fetch(`/api/events/${encodeURIComponent(title)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete event")
        setEvents(events.filter(e => e.title !== title))
      })
      .catch(err => alert(err.message))
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">{editingTitle ? "Edit Event" : "Create New Event"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event Title"
                disabled={editingTitle !== null} // prevent changing title when editing to avoid issues
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
              <Input
                type="date"
                value={newEvent.startDate}
                onChange={e => setNewEvent({ ...newEvent, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={newEvent.endDate}
                onChange={e => setNewEvent({ ...newEvent, endDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Event description..."
            />
          </div>
          <Button onClick={handleAddOrUpdateEvent} className="w-full" disabled={!newEvent.title.trim() || !newEvent.location.trim() || !newEvent.startDate || !newEvent.endDate}>
            {editingTitle ? "Update Event" : "Add Event"}
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Event List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.length === 0 ? (
            <p className="text-gray-500">No events yet. Add one!</p>
          ) : (
            <ul className="space-y-4">
              {events.map(event => (
                <li key={event.title} className="border p-4 rounded-lg flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" /> {event.location}
                    </p>
                    <p className="text-sm text-blue-500 flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" /> {event.startDate} to {event.endDate}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditEvent(event.title)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.title)}>
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
