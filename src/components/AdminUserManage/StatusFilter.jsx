import { useState, useRef, useEffect } from 'react';

/**
 * StatusFilter Component
 * 
 * A dropdown filter with checkboxes for selecting user status.
 * Allows filtering by user status (Active, Deactivated).
 */
function StatusFilter({ showActive, showDeactivated, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  /**
   * Toggles the active status
   */
  const handleToggleActive = () => {
    onChange({ showActive: !showActive, showDeactivated });
  };

  /**
   * Toggles the deactivated status
   */
  const handleToggleDeactivated = () => {
    onChange({ showActive, showDeactivated: !showDeactivated });
  };

  /**
   * Sets up click-outside handler to close dropdown when user clicks elsewhere.
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

  const getDisplayText = () => {
    if (showActive && showDeactivated) {
      return 'All Status';
    } else if (showActive) {
      return 'Active';
    } else if (showDeactivated) {
      return 'Deactivated';
    } else {
      return 'No Status Selected';
    }
  };

  return (
    <div className="relative mb-4 inline-block ml-4" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:border-gray-400 transition-all duration-200 flex items-center gap-2 min-w-120px justify-between shadow-sm hover:shadow-md active:scale-95"
      >
        <span className="text-sm">{getDisplayText()}</span>
        <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 mt-1 min-w-max bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="py-2 px-2 min-w-200px">
          <p className="text-sm font-semibold text-gray-700 px-2 py-2 mb-2">Status</p>
          
          <label className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={showActive}
              onChange={handleToggleActive}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm text-gray-700">Active</span>
          </label>

          <label className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={showDeactivated}
              onChange={handleToggleDeactivated}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm text-gray-700">Deactivated</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default StatusFilter;
