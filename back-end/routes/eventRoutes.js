import { Router } from "express";
import {
  createEvent,
  getEvents,
  updateEventByTitle,
  deleteEventByTitle,
  getEventByTitle,
} from "../controllers/eventController.js";

const router = Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:title", getEventByTitle);
router.put("/:title", updateEventByTitle);
router.delete("/:title", deleteEventByTitle);

export default router;
