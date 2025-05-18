import { Router } from "express";
import {
    getNotif,
    markAsRead,
    deleteNotif,
    createNotif
} from '../controllers/notifController.js'

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
router.get('/:userId', getNotif);
router.patch('/:notifId',markAsRead);
router.delete('/:notifId',deleteNotif);

export default router;