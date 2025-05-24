import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md px-4 py-3 flex items-center justify-between h-[10vh] z-[50]">

      <div className="md:static absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-0 top-1/2 -translate-y-7 md:-translate-y-0 md:top-auto ">
        <Link to='/'>
        <img
          src="/logojadara.png"
          alt="Jdara Logo"
          className=" h-[60px] w-auto object-contain"
        />
        </Link>
      </div>


      <nav className="hidden md:flex gap-6 items-center ml-auto font-lora">
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[20px] ml-auto"
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="p-6 flex flex-col space-y-4 font-lora">
          <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;