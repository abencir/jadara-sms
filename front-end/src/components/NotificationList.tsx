// src/components/NotificationList.tsx
import { useNotifications } from '@/hooks/useNotifications';

export const NotificationList: React.FC = () => {
  const { notifications, markAsRead, deleteNotification } = useNotifications();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
      <div className="p-4 max-h-[300px] overflow-y-auto">
        {notifications.length === 0 && (
          <p className="text-sm text-gray-500">No notifications.</p>
        )}

        {notifications.map((notif) => (
          <div
            key={notif._id}
            className={`p-3 rounded-md mb-2 ${notif.read ? 'bg-gray-100' : 'bg-blue-50'}`}
            onClick={() => markAsRead(notif._id)}
          >
            <p className="font-semibold">{notif.title}</p>
            <p className="text-sm text-gray-600">{notif.message}</p>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(notif.createdAt).toLocaleString()}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(notif._id);
              }}
              className="text-xs text-red-500 mt-1 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
