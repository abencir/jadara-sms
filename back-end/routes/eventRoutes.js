import express from "express";
import {
  createEvent,
  getEvents,
  updateEventByTitle,
  deleteEventByTitle,
  getEventByTitle,
} from "../controllers/eventController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAccess from "../middlewares/adminMiddelware.js";

const router = express.Router();

router.post("/",authMiddleware, adminAccess ,createEvent);
router.get("/", getEvents);
router.get("/:title", getEventByTitle);
router.put("/:title", authMiddleware, adminAccess ,updateEventByTitle);
router.delete("/:title", authMiddleware, adminAccess , deleteEventByTitle);

export default router;
