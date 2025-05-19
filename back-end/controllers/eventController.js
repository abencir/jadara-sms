import Events from "../models/Event.js";
import { createNotif } from "./notifController.js";
import User from "../models/User.js";
import Notification from "../models/notifications.js";

export const createEvent = async (req, res) => {
    const newEvent = req.body;
    try {
        const event = new Events(newEvent);
        await event.save();

        const students = await User.find({role: 'Student'});

        const notif = students.map((student) => ({
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

export const getEvents = async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};


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
