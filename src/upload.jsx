import { useState } from "react";
import "./upload.css";
import plusIcon from './assets/plus.svg';

function Upload() {
  const [uploadCount, setUploadCount] = useState(0);
  const [proofCount, setProofCount] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const [journalOpen, setJournalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Journal");
  const [showCoAuthorInput, setShowCoAuthorInput] = useState(false);
  const [coAuthorName, setCoAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ title: false, authorName: false, description: false, publication: false, proof: false });
  const [publicationFiles, setPublicationFiles] = useState([]);
  const [proofFiles, setProofFiles] = useState([]);

  const handleUploadClick = () => {
    document.getElementById("publicationFileInput").click();
  };

  const handlePublicationFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPublicationFiles(files);
    setErrors({ ...errors, publication: false });
  };

  const handleProofClick = () => {
    document.getElementById("proofFileInput").click();
  };

  const handleProofFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProofFiles(files);
    setErrors({ ...errors, proof: false });
  };

  const removePublicationFile = (index) => {
    setPublicationFiles(publicationFiles.filter((_, i) => i !== index));
  };

  const removeProofFile = (index) => {
    setProofFiles(proofFiles.filter((_, i) => i !== index));
  };

  const handleSubmitClick = () => {
    // Validate required fields
    const newErrors = {
      title: title.trim() === "",
      authorName: authorName.trim() === "",
      description: description.trim() === "",
      publication: publicationFiles.length === 0,
      proof: proofFiles.length === 0
    };
    setErrors(newErrors);

    // If there are errors, don't submit
    if (newErrors.title || newErrors.authorName || newErrors.description || newErrors.publication || newErrors.proof) {
      return;
    }

    setSubmitCount(submitCount + 1);
    // Reset all fields
    setUploadCount(0);
    setProofCount(0);
    setTitle("");
    setAuthorName("");
    setCoAuthorName("");
    setShowCoAuthorInput(false);
    setDescription("");
    setSelectedType("Journal");
    setPublicationFiles([]);
    setProofFiles([]);
    setErrors({ title: false, authorName: false, description: false, publication: false, proof: false });
  };

  const journalOptions = [
    "Journal",
    "Proceeding",
    "Book",
    "Article",
    "Chapter",
  ];

  return (
    <div className="flex flex-col p-12 bg-white text-black select-none">
      <div className="flex flex-col gap-1.5">
        {/* Back Button */}
        <button className="text-black border-2 border-black rounded-md py-1 px-3 font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer flex items-center gap-2 w-fit">
          <span>&lt;</span>
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
          {publicationFiles.length === 0 && (
            <button
              onClick={handleUploadClick}
              className={`bg-white text-black border-2 rounded-md py-1.5 px-6 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center gap-2 opacity-100 ${
                errors.publication
                  ? "border-red-500"
                  : "border-black"
              }`}
              style={{
                animation: "fadeIn 0.3s ease-out"
              }}
            >
              <img src={plusIcon} alt="Plus icon" className="w-2.5 h-2.5" />
              Add Publication
            </button>
          )}
          <input
            id="publicationFileInput"
            type="file"
            onChange={handlePublicationFileChange}
            className="hidden"
          />
          {publicationFiles.length > 0 && (
            <div className="mt-2 flex flex-col gap-1 w-[95%] opacity-100" style={{
              animation: "fadeIn 0.3s ease-out"
            }}>
              {publicationFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    onClick={() => removePublicationFile(index)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* End of  Academic Publication */}

        {/* Publication Proof */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Upload Your Publication Proof</h1>
          {proofFiles.length === 0 && (
            <button
              onClick={handleProofClick}
              className={`bg-white text-black border-2 rounded-md py-1.5 px-6 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center gap-2 opacity-100 ${
                errors.proof
                  ? "border-red-500"
                  : "border-black"
              }`}
              style={{
                animation: "fadeIn 0.3s ease-out"
              }}
            >
              <img src={plusIcon} alt="Plus icon" className="w-2.5 h-2.5"/>
              Add Proof
            </button>
          )}
          <input
            id="proofFileInput"
            type="file"
            onChange={handleProofFileChange}
            className="hidden"
          />
          {proofFiles.length > 0 && (
            <div className="mt-2 flex flex-col gap-1 w-[95%] opacity-100" style={{
              animation: "fadeIn 0.3s ease-out"
            }}>
              {proofFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                  <span className="text-sm truncate">{file.name}</span>
                  <button
                    onClick={() => removeProofFile(index)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* End of Publication Proof */}

        {/* Title */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Title:</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim() !== "") {
                setErrors({ ...errors, title: false });
              }
            }}
            className={`border-2 py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-200 ${
              errors.title
                ? "border-red-500 placeholder-red-500"
                : "border-black"
            }`}
            placeholder={errors.title ? "Title is required" : "Enter Title"}
          />
        </div>
        {/* End of Title */}

        {/* Author Name */}
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-col">
            <h1 className="text-2xl">Please Enter Author Name:</h1>
            <input
              type="text"
              value={authorName}
              onChange={(e) => {
                setAuthorName(e.target.value);
                if (e.target.value.trim() !== "") {
                  setErrors({ ...errors, authorName: false });
                }
              }}
              className={`border-2 py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-200 ${
                errors.authorName
                  ? "border-red-500 placeholder-red-500"
                  : "border-black"
              }`}
              placeholder={errors.authorName ? "Author Name is required" : "Enter Author Name"}
            />
          </div>
        </div>
        {/* End of Author Name */}

        {/* Co-author */}
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
              className="border-2 border-black py-2 px-3 rounded-md w-[95%] hover:bg-gray-100 transition-all duration-300 opacity-100 scale-100"
              style={{
                animation: "fadeInScale 0.3s ease-out"
              }}
              placeholder="Enter Co-author Name"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setShowCoAuthorInput(true)}
              className="bg-white text-black border-2 border-black rounded-md py-1.5 px-4 w-fit hover:bg-gray-100 transition-all duration-200 cursor-pointer flex items-center gap-2 opacity-100 scale-100"
              style={{
                animation: "fadeInScale 0.3s ease-out"
              }}
            >
              <img src={plusIcon} alt="Plus icon" className="w-3 h-3"/>
              Add Co-author
            </button>
          )}
        </div>
        {/* End of Co-author */}

        {/* Description */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl">Please Enter Publication Description:</h1>
          <div className="relative w-[95%]">
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 1000) {
                  setDescription(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setErrors({ ...errors, description: false });
                  }
                }
              }}
              className={`border-2 py-2 px-3 rounded-md w-full hover:bg-gray-100 transition-all duration-200 resize-none h-20 ${
                errors.description
                  ? "border-red-500 placeholder-red-500"
                  : "border-black"
              }`}
              placeholder={errors.description ? "Description is required" : "Enter Description"}
            />
            <span className="absolute bottom-2 right-3 text-xs text-gray-600 pointer-events-none">{description.length} / 1000</span>
          </div>
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
