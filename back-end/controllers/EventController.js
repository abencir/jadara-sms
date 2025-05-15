import Events from "../models/Event.js";

export const createEvent = async (req, res) => {
    const newEvent = req.body;
    try {
        const event = new Events(newEvent);
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
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

// Get event by title
export const getEventByTitle = async (req, res) => {
    const eventTitle = req.params.title;
    try {
        const event = await Events.findOne({ title: eventTitle });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};

// Update event by title
export const updateEventByTitle = async (req, res) => {
    const eventTitle = req.params.title;
    const updatedEventData = req.body;
    try {
        const updatedEvent = await Events.findOneAndUpdate(
            { title: eventTitle },
            updatedEventData,
            { new: true, runValidators: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating the event', error: error.message });
    }
};

// Delete event by title
export const deleteEventByTitle = async (req, res) => {
    const eventTitle = req.params.title;
    try {
        const deletedEvent = await Events.findOneAndDelete({ title: eventTitle });
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error: error.message });
    }
};
