import { Router } from "express";
import Events from "../models/Event.js";
import mongoose from "mongoose";

const router = Router();

router.post("/create-events", async (req, res) => {
    const newEvent = req.body;

    try {
        const event = new Events(newEvent);
        console.log("Saving event...");
        await event.save();
        console.log("Event saved!"); res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
});

router.get("/events", async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
});

router.put("/update-event/:title", async (req, res) => {

    const eventTitle = req.params.title;
    const updatedEventData = req.body;
    try {
        const updatedEvent = await Events.findOneAndUpdate({title: eventTitle}, updatedEventData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating the event', error: error.message });
    }
});

router.delete("/delete-event/:title", async (req, res) => {
    const eventTitle = req.params.title;

    try {
        const deletedEvent = await Events.findOneAndDelete({title: eventTitle});
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted successfully", event: deletedEvent });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Error deleting event", error: error.message });
    }
});




export default router;