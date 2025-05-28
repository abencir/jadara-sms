import { useNotifications } from '@/hooks/useNotifications';

const NotificationList = () => {
  const { notifications, loading, markAsRead } = useNotifications();

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-semibold">Notifications</h2>
      {notifications.length === 0 && <p>No notifications</p>}
      {notifications.map((notif) => (
        <div
          key={notif._id}
          className={`p-3 rounded-md border shadow ${notif.isRead ? 'bg-gray-100' : 'bg-white'}`}
        >
          <p>{notif.message}</p>
          {!notif.isRead && (
            <button
              onClick={() => markAsRead(notif._id)}
              className="mt-2 text-sm text-blue-600 underline"
            >
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
