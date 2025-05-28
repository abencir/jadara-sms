import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

type Notification = {
    _id: string;
    userId: string;
    type: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
  };
  
  export const useNotifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchNotifications = async () => {
      if (!user?.id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error('Error fetching notifications', err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchNotifications();
    }, [user]);
  
    const markAsRead = async (notifId: string) => {
      try {
        await axios.patch(
          `http://localhost:5000/api/notifications/${notifId}`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === notifId ? { ...notif, isRead: true } : notif
          )
        );
      } catch (err) {
        console.error('Error marking notification as read', err);
      }
    };
  
    return { notifications, loading, markAsRead, refetch: fetchNotifications };
  };
  