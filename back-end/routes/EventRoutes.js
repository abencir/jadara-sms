import { Router } from "express";
import {
  createEvent,
  getEvents,
  updateEventByTitle,
  deleteEventByTitle,
  getEventByTitle,
} from "../controllers/EventController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAccess from "../middlewares/adminMiddelware.js";

const router = Router();

router.post("/create-events", createEvent);
router.get("/events", authMiddleware, getEvents);
router.get("/events/:title", getEventByTitle);
router.put("/events/:title",authMiddleware, adminAccess ,updateEventByTitle);
router.delete("/events/:title", authMiddleware, adminAccess ,deleteEventByTitle);

export default router;
