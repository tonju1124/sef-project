import { useState, useRef, useEffect } from "react";

/**
 * FacultyDropdown Component
 * 
 * A dropdown selector for choosing a faculty from predefined options.
 * When "Others" is selected, displays a text input field for custom faculty entry.
 */
function FacultyDropdown({ value, customFaculty, setCustomFaculty, onChange, hasError, customFacultyError, setCustomFacultyError }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  /**
   * Sets up click-outside handler to close dropdown when user clicks elsewhere.
   * Adds/removes event listener based on dropdown open state.
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  /**
   * Available faculty options to display in the dropdown.
   * Includes predefined faculties and "Others" option for custom entry.
   */
  const options = [
    { value: "FCI", label: "FCI - Faculty of Computing and Informatics" },
    { value: "FOM", label: "FOM - Faculty of Accountancy and Management" },
    { value: "FCM", label: "FCM - Faculty of Commerce and Management" },
    { value: "FAC", label: "FAC - Faculty of Arts and Communication" },
    { value: "FAIE", label: "FAIE - Faculty of Applied Information and Engineering" },
    { value: "Others", label: "Others" }
  ];

  /**
   * Determines the display value for the dropdown button.
   * Shows "Others" if custom faculty is selected or being edited.
   */
  const displayValue = value === "Others" || (customFaculty && value !== "FCI" && value !== "FOM" && value !== "FCM" && value !== "FAC" && value !== "FAIE") ? "Others" : value;

  /**
   * Toggles the dropdown open/closed state.
   */
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-2 border rounded-lg text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
            hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } bg-white`}
        >
          <span className={hasError ? 'text-red-500' : ''}>{options.find(opt => opt.value === displayValue)?.label || "Select Faculty"}</span>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        {/* Display faculty options - user can click to select */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-slide-in">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${displayValue === option.value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Show custom faculty input field when "Others" option is selected */}
      {displayValue === "Others" ? (
        <input
          type="text"
          value={customFaculty}
          onChange={(e) => {
            // Update custom faculty value and clear error if input has text
            setCustomFaculty(e.target.value);
            if (e.target.value.trim()) {
              setCustomFacultyError(false);
            }
          }}
          placeholder="Enter your faculty name"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 mt-2 transition-all ${
            customFacultyError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
      ) : null}
    </>
  );
}

export default FacultyDropdown;
