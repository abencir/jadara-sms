import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Bell, Menu, X } from 'lucide-react';

interface Notification {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, logout } = useAuth();

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`/api/notifications/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch notifications');
      
      const data = await response.json();
      setNotifications(data);
      setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true })
      });
      
      if (!response.ok) throw new Error('Failed to mark as read');
      
      setNotifications(prev => 
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-3 flex items-center justify-between h-[10vh] z-[50]">

      {/* Logo */}
      <div className="md:static absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-0 top-1/2 -translate-y-7 md:-translate-y-0 md:top-auto">
        <Link to='/'>
          <img
            src="/logojadara.png"
            alt="Jdara Logo"
            className="h-[60px] w-auto object-contain"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="flex items-center gap-4 ml-auto">
        {user && (
          <div className="relative">
            <button 
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-1"
            >
              <Bell className="w-6 h-6 text-gray-700 hover:text-blue-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotif && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 max-h-80 overflow-y-auto border border-gray-200">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  <ul>
                    {notifications.map(notification => (
                      <li 
                        key={notification._id}
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                          !notification.isRead ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markAsRead(notification._id)}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        <nav className="hidden md:flex gap-6 items-center font-lora">
          {user ? (
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600">
                <img src='user.png' alt='user icon' style={{"height": "40px"}}/>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Update Profile</Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[20px] ml-auto"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Content */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="p-6 flex flex-col space-y-4 font-lora">
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Update Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-left text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
              
              {/* Mobile Notifications Link */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowNotif(true);
                }}
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <Bell className="w-5 h-5 mr-2" />
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                    {unreadCount}
                  </span>
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                About Us
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;