import { useState } from "react";

/**
 * PublicationTypeDropdown Component
 * 
 * A dropdown selector for choosing publication type.
 * Allows users to select from predefined publication types (Journal, Proceeding, Book, Article, Chapter).
 */
export default function PublicationTypeDropdown({ selectedType, setSelectedType }) {
  const [journalOpen, setJournalOpen] = useState(false);

  /**
   * Available publication type options for user selection.
   */
  const journalOptions = [
    "Journal",
    "Proceeding",
    "Book",
    "Article",
    "Chapter",
  ];

  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl">Publication Type</h1>

      <div className="relative text-black">
        {/* Toggle button to open/close dropdown */}
        <button
          onClick={() => setJournalOpen(!journalOpen)}
          className="bg-white border-2 border-gray-300 rounded-md px-4 py-1.5 flex justify-between items-center hover:bg-gray-100 hover:border-gray-400 focus:bg-gray-100 focus:border-gray-400 focus:shadow-md transition-all duration-300 cursor-pointer outline-none"
        >
          {selectedType}
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${journalOpen ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        {/* Display publication type options when dropdown is open */}
        {journalOpen && (
          <div className="absolute bg-white border-2 border-gray-300 rounded-md mt-1 w-40 z-10 dropdown-open">
            {/* Publication type options with selection handler */}
            {journalOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedType(option);
                  setJournalOpen(false);
                }}
                className="block w-full text-left px-2 py-2 hover:bg-gray-200 transition-colors duration-150 cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
