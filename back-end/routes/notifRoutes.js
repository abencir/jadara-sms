import { Router } from "express";
import {
    getNotif,
    markAsRead,
    deleteNotif
} from '../controllers/notifController'

const router = Router();

router.get('/:userId', getNotif);
router.patch('/:notifId',markAsRead);
router.delete('/:notifId',deleteNotif);

export default router;