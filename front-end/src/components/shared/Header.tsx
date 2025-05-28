import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/hooks/useNotifications";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { notifications, markAsRead } = useNotifications();

  const toggleNotifications = () => setShowNotifs(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-3 flex items-center justify-between h-[10vh] z-[50]">
      <div className="md:static absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-0 top-1/2 -translate-y-7 md:-translate-y-0 md:top-auto ">
        <Link to="/">
          <img
            src="/logojadara.png"
            alt="Jdara Logo"
            className=" h-[60px] w-auto object-contain"
          />
        </Link>
      </div>

      <nav className="hidden md:flex gap-6 items-center ml-auto font-lora">
        {user ? (
          <>
            <div className="relative" ref={notifRef}>
              <button onClick={toggleNotifications} className="relative">
                <img src="/bell.png" alt="Notifications" className="h-6 w-6" />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full" />
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-md z-50">
                  <div className="p-4">
                    <h3 className="text-md font-semibold mb-2">Notifications</h3>
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-500">No notifications</p>
                    ) : (
                      <ul className="space-y-2 max-h-60 overflow-y-auto">
                        {notifications.map((notif) => (
                          <li key={notif._id} className={`p-2 rounded ${notif.isRead ? 'bg-gray-100' : 'bg-white'}`}>
                            <p className="text-sm">{notif.message}</p>
                            {!notif.isRead && (
                              <button
                                onClick={() => markAsRead(notif._id)}
                                className="text-xs text-blue-500 hover:underline mt-1"
                              >
                                Mark as read
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 👤 User Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600">
                <img src="/user.png" alt="user icon" style={{ height: "40px" }} />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Update Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
          </>
        )}
      </nav>

      {/* Hamburger for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[20px] ml-auto"
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
