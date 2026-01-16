import { useState } from 'react'

function Upload() {
  const [count, setCount] = useState(0)
  const [journalOpen, setJournalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("Journal")

  const handleClick = () => {
    setCount(count + 1)
  }

  const journalOptions = ["Journal", "Proceeding", "Book", "Article", "Chapter"]

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={handleClick}
        className="bg-gray-400 text-black ml-6 mt-6 border-2 border-black rounded-md h-9 w-32"
      >
        Back
      </button>

      {/* Journal Dropdown */}
      <p className="ml-6 text-2xl mt-4">Publication Type</p>

      <div className="relative ml-6">
        <button
          onClick={() => setJournalOpen(!journalOpen)}
          className="bg-white text-black border-2 border-black rounded-md h-9 w-40 px-2 flex justify-between items-center"
        >
          {selectedType}
          <span className="ml-2">▼</span>
        </button>

        {journalOpen && (
          <div className="absolute bg-white border-2 border-black rounded-md mt-1 w-40 z-10">
            {journalOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedType(option)
                  setJournalOpen(false)
                }}
                className="block w-full text-left px-2 py-1 hover:bg-white"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Academic Publication */}
      <p className="ml-6 text-2xl mt-4">Upload Your Academic Publication</p>
      <button
        onClick={handleClick}
        className="bg-gray-400 text-black ml-6 border-2 border-black rounded-md h-9 w-32"
      >
        Upload: {count}
      </button>

      {/* Publication Proof */}
      <p className="ml-6 text-2xl mt-4">Upload Your Publication Proof</p>
      <button
        onClick={handleClick}
        className="bg-gray-400 text-black ml-6 border-2 border-black rounded-md h-9 w-32"
      >
        Upload: {count}
      </button>

      {/* Title */}
      <p className="ml-6 text-2xl mt-4">Title:</p>
      <input
        type="text"
        className="border-2 border-black p-2 ml-6 rounded-md w-[95%]"
        placeholder="Enter Title"
      />

      {/* Author Name */}
      <p className="ml-6 text-2xl mt-4">Please Enter Author Name:</p>
      <input
        type="text"
        className="border-2 border-black p-2 ml-6 rounded-md w-[95%]"
        placeholder="Enter Author Name"
      />

      {/* Co-author */}
      <p className="ml-6 text-2xl mt-4">Co-author</p>
      <button
        onClick={handleClick}
        className="bg-gray-400 text-black ml-6 border-2 border-black rounded-md h-9 w-32"
      >
        Add Co-author: {count}
      </button>

      {/* Description */}
      <p className="ml-6 text-2xl mt-4">Please Enter Publication Description:</p>
      <input
        type="text"
        className="border-2 border-black p-2 ml-6 rounded-md w-[95%]"
        placeholder="Enter Description"
      />

      {/* Submit */}
      <button
        onClick={handleClick}
        className="bg-gray-400 text-black ml-6 mt-6 border-2 border-black rounded-md h-9 w-32"
      >
        Submit: {count}
      </button>
    </div>
  )
}

<<<<<<< HEAD
export default Upload
=======
export default Upload
>>>>>>> 4c85ba76bae172398b0c0b90b8c7dc0f482229d7
