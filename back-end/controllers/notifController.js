import Notification from "../models/notifications.js";

// Create Notification (Internally using)
export const createNotif = async (data) => {
    try {
        const notif = new Notification(data);
        await notif.save();
        return notif;
    } catch (error) {
        console.error('Error creating notification', error);
    }
};

// Get notification by User ID
export const getNotif = async (req, res) => {
    try {
        const {userId} = req.params;
        const notif = await Notification.find({userId}).sort({ createdAt: -1 });
        res.status(200).json(notif);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch notifications'});
    }
};

// Mark notification as Read
export const markAsRead = async (req, res) => {
    try {
        const {notifId} = req.params;
        const updated = await Notification.findByIdAndUpdate(notifId, { isRead: true}, {new: true});
        if (!updated) {
            return res.status(404).json({ message: 'Notification not found' });
          };
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark as read' });
    }
};

// Delete notification
export const deleteNotif = async (req, res) => {
    try {
        const {notifId} = req.params;
        const notif = await Notification.findByIdAndDelete(notifId);
        res.status(200).json({ message: 'Notification deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' });
    }
}