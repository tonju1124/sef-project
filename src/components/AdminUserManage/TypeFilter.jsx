import { useState, useRef, useEffect } from 'react';

/**
 * TypeFilter Component
 * 
 * A dropdown filter for selecting user type.
 * Allows filtering by user role (All, Admin, Student, Lecturer, Coordinator).
 */
function TypeFilter({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const types = ['All', 'Admin', 'Student', 'Lecturer', 'Coordinator'];
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  /**
   * Updates the selected filter value and closes the dropdown.
   */
  const handleSelect = (type) => {
    onChange(type);
    setIsOpen(false);
  };

  /**
   * Sets up click-outside handler to close dropdown when user clicks elsewhere.
   * Adds/removes event listener based on dropdown open state.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative mb-4 inline-block" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:border-gray-400 transition-all duration-200 flex items-center gap-2 min-w-120px justify-between shadow-sm hover:shadow-md active:scale-95"
      >
        <span className="text-sm">{value}</span>
        <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 mt-1 min-w-max bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <ul className="py-1">
          {types.map((type) => (
            <li key={type}>
              <button
                onClick={() => handleSelect(type)}
                className={`w-full text-left px-4 py-2 text-sm transition-all duration-150 whitespace-nowrap ${
                  value === type 
                    ? 'bg-gray-100 text-gray-900 font-medium border-l-3 border-gray-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TypeFilter;