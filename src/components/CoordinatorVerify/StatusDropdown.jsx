import { useState, useRef, useEffect } from 'react';

/**
 * StatusDropdown Component
 * 
 * A dropdown selector for changing publication verification status.
 * Displays status with color-coded icons and allows selection from verified, pending, or rejected states.
 */

function StatusDropdown({ status, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  /**
   * Returns the color styling for a given status.
   * Applies appropriate background and text colors based on status type.
   **/

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Converts status text to display format with first letter capitalized.
   **/
  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  /**
   * Returns the appropriate SVG icon for a given status.
   * Different icons represent verified (checkmark), pending (circle), and rejected (X) states.
   **/
  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        );
      default:
        return null;
    }
  };

  /**
   * Handles status selection from dropdown options.
   * Updates the status value and closes the dropdown.
   **/
  const handleSelect = (newStatus) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  /**
   * Sets up click-outside handler to close dropdown when user clicks elsewhere.
   * Adds/removes event listeners based on dropdown open state.
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
    <div className="relative w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${getStatusColor(status)} hover:opacity-80`}
      >
        {getStatusIcon(status)}
        {getStatusLabel(status)}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {['verified', 'pending', 'rejected'].map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full px-4 py-3 text-sm font-medium text-left flex items-center gap-2 transition-all duration-150 ${
              status === option
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            } ${option === 'verified' ? 'rounded-t-lg' : ''} ${
              option === 'rejected' ? 'rounded-b-lg' : ''
            } border-b border-gray-200 last:border-b-0`}
          >
            {getStatusIcon(option)}
            {getStatusLabel(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

function FilterDropdown({ value, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef(null);

  /**
   * Triggers animation effect when value changes.
   * Briefly scales the button to provide visual feedback.
   */
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const options = ['All', 'Verified', 'Pending', 'Rejected'];

  /**
   * Returns the color styling for a given filter status.
   * Applies appropriate background and text colors based on filter type.
   **/
  const getStatusColor = (status) => {
    if (status === 'All') return 'bg-blue-100 text-blue-800';
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Returns the appropriate SVG icon for a given filter status.
   * Different icons represent all publications, verified, pending, and rejected states.
   **/
  const getStatusIcon = (status) => {
    switch (status) {
      case 'All':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h6v6H4V4zm8 0h6v6h-6V4zm-8 8h6v6H4v-6zm8 0h6v6h-6v-6z" />
          </svg>
        );
      case 'Verified':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        );
      case 'Pending':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
          </svg>
        );
      case 'Rejected':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        );
      default:
        return null;
    }
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

  /**
   * Sets up click-outside handler to close dropdown when user clicks elsewhere.
   * Adds/removes event listeners based on dropdown open state.
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

  /**
   * Handles filter option selection.
   * Updates the filter value and closes the dropdown.
   **/
  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap ${getStatusColor(value)} hover:opacity-80 ${
          isAnimating ? 'scale-90' : 'scale-100'
        } transition-transform duration-300`}
      >
        {getStatusIcon(value)}
        {value}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition-all duration-300 min-w-max ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full text-left px-4 py-3 first:rounded-t-lg last:rounded-b-lg whitespace-nowrap flex items-center gap-2 transition-all ${
              value === option
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            } border-b border-gray-200 last:border-b-0`}
          >
            {getStatusIcon(option)}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export { StatusDropdown, FilterDropdown };
export default StatusDropdown;
