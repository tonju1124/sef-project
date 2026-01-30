import { useState, useRef, useEffect } from 'react';

function AdminFilterDropdown({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hiddenFilter, setHiddenFilter] = useState('All');
  const [statusFilters, setStatusFilters] = useState({
    verified: true,
    pending: true,
    rejected: true
  });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const hiddenOptions = ['All', 'Hidden', 'Visible'];

  // Notify parent of filter changes
  const notifyFilterChange = (hidden, status) => {
    onFilterChange?.({
      hidden,
      status
    });
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleHiddenChange = (option) => {
    setHiddenFilter(option);
    notifyFilterChange(option, statusFilters);
  };

  const handleStatusToggle = (status) => {
    const newStatusFilters = {
      ...statusFilters,
      [status]: !statusFilters[status]
    };
    setStatusFilters(newStatusFilters);
    notifyFilterChange(hiddenFilter, newStatusFilters);
  };

  const handleResetFilters = () => {
    setHiddenFilter('All');
    setStatusFilters({
      verified: true,
      pending: true,
      rejected: true
    });
    notifyFilterChange('All', {
      verified: true,
      pending: true,
      rejected: true
    });
  };

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
    <div ref={dropdownRef} className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none cursor-pointer flex items-center gap-2 font-medium text-gray-800"
      >
        Admin Filters
        <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 min-w-max p-4 w-64 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Hidden Filter */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Hidden Status</h3>
          <div className="space-y-2">
            {hiddenOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleHiddenChange(option)}
                className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                  hiddenFilter === option
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Status Filter */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Verification Status</h3>
          <div className="space-y-2">
            {['verified', 'pending', 'rejected'].map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={statusFilters[status]}
                  onChange={() => handleStatusToggle(status)}
                  className="w-4 h-4 rounded border-gray-300 accent-blue-500"
                />
                <span className="text-gray-800 capitalize text-sm">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Reset Button */}
        <button
          onClick={handleResetFilters}
          className="w-full px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium transition-colors text-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default AdminFilterDropdown;
