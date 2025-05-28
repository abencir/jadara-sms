import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById
} from "../controllers/eventController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAccess from "../middlewares/adminMiddelware.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById);

export default router;
