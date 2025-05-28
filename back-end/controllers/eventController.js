import Events from "../models/Event.js";
import User from "../models/User.js";
import Notification from "../models/notifications.js";

// Create event and notify students
export const createEvent = async (req, res) => {
    const newEvent = req.body;
    try {
        const event = new Events(newEvent);
        await event.save();

        const students = await User.find({ role: 'Student' });

        const notif = students.map(student => ({
            userId: student._id,
            type: 'event_created',
            message: `A new event "${event.title}" has been created. Check it out!`,
        }));

        await Notification.insertMany(notif);

        res.status(201).json({ message: 'Event created successfully and notifications sent', event });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Get all events
export const getEvents = async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

// Get event by ID
export const getEventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Events.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// Update event by ID
export const updateEventById = async (req, res) => {
    const eventId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedEvent = await Events.findByIdAndUpdate(eventId, updatedData, { new: true, runValidators: true });
        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};

// Delete event by ID
export const deleteEventById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Events.findByIdAndDelete(eventId);
        if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error: error.message });
    }
};
