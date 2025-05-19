import { Router } from "express";
import {
    getNotif,
    markAsRead,
    deleteNotif,
    createNotif
} from '../controllers/notifController.js'
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAccess from "../middlewares/adminMiddelware.js";
const router = Router();

// test create notif 
// router.post('/', async (req, res) => {
//     try {
//       const notif = await createNotif(req.body);
//       res.status(201).json(notif);
//     } catch (err) {
//       res.status(500).json({  error: err.message });
//     }
//   });
router.get('/:userId', authMiddleware,getNotif);
router.patch('/:notifId', authMiddleware, adminAccess ,markAsRead);
router.delete('/:notifId', authMiddleware, adminAccess ,deleteNotif);

export default router;