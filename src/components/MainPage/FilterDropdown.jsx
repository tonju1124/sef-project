import { useRef, useEffect } from 'react';

function FilterDropdown({ label, value, options, isOpen, onToggle, onSelect, dropdownPos }) {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleOpen = () => {
    onToggle(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none cursor-pointer flex items-center gap-2"
      >
        {value}
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      <div
        className={`absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 min-w-max ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        onClick={(e) => {
          const option = e.target.textContent;
          if (options.includes(option)) {
            onSelect(option);
          }
        }}
      >
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              onSelect(option);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg whitespace-nowrap"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterDropdown;
