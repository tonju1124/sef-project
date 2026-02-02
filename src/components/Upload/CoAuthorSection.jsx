import { useState } from "react";

export default function CoAuthorSection({
  coAuthorName,
  setCoAuthorName,
  showCoAuthorInput,
  setShowCoAuthorInput
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className="text-2xl">Co-author</h1>
      {showCoAuthorInput ? (
        <input
          type="text"
          value={coAuthorName}
          onChange={(e) => setCoAuthorName(e.target.value)}
          onBlur={() => {
            if (coAuthorName.trim() === "") {
              setShowCoAuthorInput(false);
            }
          }}
          className="border-2 border-gray-300 py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-300 opacity-100 scale-100"
          style={{
            animation: "fadeInScale 0.3s ease-out"
          }}
          placeholder="Enter Co-author Name"
          autoFocus
        />
      ) : (
        <button
          onClick={() => setShowCoAuthorInput(true)}
          className="bg-white text-black border-2 border-gray-300 rounded-md py-1.5 px-4 w-fit hover:bg-gray-100 hover:border-gray-400 focus:bg-gray-100 focus:border-gray-400 focus:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-2 opacity-100 scale-100 outline-none"
          style={{
            animation: "fadeInScale 0.3s ease-out"
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Add Co-author
        </button>
      )}
    </div>
  );
}
