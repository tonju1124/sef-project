import { useState } from "react";

export default function PublicationTypeDropdown({ selectedType, setSelectedType }) {
  const [journalOpen, setJournalOpen] = useState(false);

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
        <button
          onClick={() => setJournalOpen(!journalOpen)}
          className="bg-white border-2 border-gray-300 rounded-md px-4 py-1.5 flex justify-between items-center hover:bg-gray-100 transition-all duration-200 cursor-pointer"
        >
          {selectedType}
          <span
            className={`ml-2 text-sm transition-transform duration-300 ${journalOpen ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
        {journalOpen && (
          <div className="absolute bg-white border-2 border-gray-300 rounded-md mt-1 w-40 z-10 dropdown-open">
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
