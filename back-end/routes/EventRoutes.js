import { Router } from "express";
import {
  createEvent,
  getEvents,
  updateEventByTitle,
  deleteEventByTitle,
  getEventByTitle,
} from "../controllers/EventController.js";

const router = Router();

router.post("/create-events", createEvent);
router.get("/events", getEvents);
router.get("/events/:title", getEventByTitle);
router.put("/events/:title", updateEventByTitle);
router.delete("/events/:title", deleteEventByTitle);

export default router;
