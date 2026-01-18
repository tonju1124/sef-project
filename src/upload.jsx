import { useState } from "react";
import "./upload.css";

function Upload() {
  const [uploadCount, setUploadCount] = useState(0);
  const [proofCount, setProofCount] = useState(0);
  const [coAuthorCount, setCoAuthorCount] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const [journalOpen, setJournalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Journal");

  const handleUploadClick = () => {
    setUploadCount(uploadCount + 1);
  };

  const handleProofClick = () => {
    setProofCount(proofCount + 1);
  };

  const handleCoAuthorClick = () => {
    setCoAuthorCount(coAuthorCount + 1);
  };

  const handleSubmitClick = () => {
    setSubmitCount(submitCount + 1);
  };

  const journalOptions = [
    "Journal",
    "Proceeding",
    "Book",
    "Article",
    "Chapter",
  ];

  return (
    <div className="flex flex-col p-12 bg-white text-black h-screen select-none">
      <div className="flex flex-col gap-1.5">
        {/* Back Button */}
        <button className="text-black border-2 border-black rounded-md py-1.5 px-4 font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer flex w-fit">
          Back
        </button>
        {/* Journal Dropdown */}
        <div className="flex flex-col gap-0.5">
          <h1 className=" text-2xl">Publication Type</h1>

          <div className="relative text-black">
            <button
              onClick={() => setJournalOpen(!journalOpen)}
              className="bg-white border-2 border-black rounded-md px-4 py-1.5 flex justify-between items-center hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              {selectedType}
              <span
                className={`ml-2 text-sm transition-transform duration-300 ${journalOpen ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            {journalOpen && (
              <div className="absolute bg-white border-2 border-black rounded-md mt-1 w-40 z-10 dropdown-open">
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
        {/* End of Journal Dropdown */}

        {/* Academic Publication */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Upload Your Academic Publication</h1>
          <button
            onClick={handleUploadClick}
            className="bg-white text-black border-2 border-black rounded-md py-1.5 px-6 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            Upload: {uploadCount}
          </button>
        </div>
        {/* End of  Academic Publication */}

        {/* Publication Proof */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Upload Your Publication Proof</h1>
          <button
            onClick={handleProofClick}
            className="bg-white text-black border-2 border-black rounded-md py-1.5 px-6 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            Upload: {proofCount}
          </button>
        </div>
        {/* End of Publication Proof */}

        {/* Title */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Title:</h1>
          <input
            type="text"
            className="border-2 border-black py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-200"
            placeholder="Enter Title"
          />
        </div>
        {/* End of Title */}

        {/* Author Name */}
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-col">
            <h1 className="text-2xl">Please Enter Author Name:</h1>
            <input
              type="text"
              className="border-2 border-black py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-200"
              placeholder="Enter Author Name"
            />
          </div>
        </div>
        {/* End of Author Name */}

        {/* Co-author */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Co-author</h1>
          <button
            onClick={handleCoAuthorClick}
            className="bg-white text-black border-2 border-black rounded-md py-1.5 px-4 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            Add Co-author: {coAuthorCount}
          </button>
        </div>
        {/* End of Co-author */}

        {/* Description */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Please Enter Publication Description:</h1>
          <input
            type="text"
            className="border-2 border-black py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-200"
            placeholder="Enter Description"
          />
        </div>
        {/* Description */}

        {/* Submit */}
        <div className="flex justify-end w-[95%]">
          <p
            onClick={handleSubmitClick}
            className="text-black border-2 border-black rounded-md py-1.5 px-4 font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          >
            Submit
          </p>
        </div>
      </div>
    </div>
  );
}

export default Upload;
