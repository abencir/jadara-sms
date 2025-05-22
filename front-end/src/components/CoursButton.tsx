import React, { useState } from 'react';

type SubLink = {
  label: string;
  url: string;
};

type CourseButtonProps = {
  title: string;
  subLinks: SubLink[];
};

export default function CourseButton({ title, subLinks }: CourseButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 border rounded-xl shadow-sm text-gray-700 font-medium hover:border-[#0080FF] transition duration-200"
      >
        {title}
        <span className="text-orange-500 text-lg">&gt;</span>
      </button>

      {isOpen && (
        <div className="mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-md z-10 absolute left-0">
          {subLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 border-b last:border-none"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}