import { useState } from "react";
import "./upload.css";
import { useUser } from "./context/UserContext";
import { publications } from "./data/publications";
import BackButton from "./components/Upload/BackButton";
import PublicationTypeDropdown from "./components/Upload/PublicationTypeDropdown";
import FileUploadSection from "./components/Upload/FileUploadSection";
import FormInput from "./components/Upload/FormInput";
import CoAuthorSection from "./components/Upload/CoAuthorSection";
import DescriptionTextarea from "./components/Upload/DescriptionTextarea";
import SubmitButton from "./components/Upload/SubmitButton";

function Upload() {
  const { user } = useUser();
  const [selectedType, setSelectedType] = useState("Journal");
  const [title, setTitle] = useState("");
  const [coAuthorName, setCoAuthorName] = useState("");
  const [showCoAuthorInput, setShowCoAuthorInput] = useState(false);
  const [description, setDescription] = useState("");
  const [publicationFiles, setPublicationFiles] = useState([]);
  const [proofFiles, setProofFiles] = useState([]);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    publication: false,
    proof: false
  });

  const handlePublicationFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPublicationFiles(files);
    setErrors({ ...errors, publication: false });
  };

  const handleProofFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProofFiles(files);
    setErrors({ ...errors, proof: false });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") {
      setErrors({ ...errors, title: false });
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 1000) {
      setDescription(e.target.value);
      if (e.target.value.trim() !== "") {
        setErrors({ ...errors, description: false });
      }
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getNextId = () => {
    return Math.max(...publications.map(p => p.id)) + 1;
  };

  const handleSubmitClick = () => {
    const newErrors = {
      title: title.trim() === "",
      description: description.trim() === "",
      publication: publicationFiles.length === 0,
      proof: proofFiles.length === 0
    };
    setErrors(newErrors);

    if (newErrors.title || newErrors.description || newErrors.publication || newErrors.proof) {
      return;
    }

    // Create new publication object
    const newPublication = {
      id: getNextId(),
      title: title.trim(),
      author: user.name,
      coauthor: coAuthorName.trim() || "",
      uploadDate: getTodayDate(),
      description: description.trim(),
      bookmarked: false,
      hidden: false,
      category: selectedType.toLowerCase(),
      status: "pending"
    };

    // Add to publications array
    publications.push(newPublication);

    // Reset all fields
    setTitle("");
    setCoAuthorName("");
    setDescription("");
    setSelectedType("Journal");
    setPublicationFiles([]);
    setProofFiles([]);
    setErrors({ title: false, description: false, publication: false, proof: false });
    
    alert("Publication submitted successfully! Status: Pending");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 text-black flex flex-col select-none p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        <BackButton />

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Publish Your Research</h1>
          <p className="text-gray-600">Share your academic publication with the community</p>
        </div>

        {/* Publication Type Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Publication Type</h2>
          <PublicationTypeDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>

        {/* Basic Information Section */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <FormInput
                label="Title:"
                value={title}
                onChange={handleTitleChange}
                placeholder={errors.title ? "Title is required" : "Enter publication title"}
                hasError={errors.title}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Author:</label>
              <div className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 text-gray-700 font-medium">
                {user.name}
              </div>
            </div>

            <div className="w-full">
              <CoAuthorSection
                coAuthorName={coAuthorName}
                setCoAuthorName={setCoAuthorName}
                showCoAuthorInput={showCoAuthorInput}
                setShowCoAuthorInput={setShowCoAuthorInput}
              />
            </div>
          </div>
        </div>

        {/* Files Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Files</h2>
          <div className="flex flex-col gap-6">
            <div>
              <FileUploadSection
                title="Publication File"
                buttonLabel="Choose Publication"
                files={publicationFiles}
                hasError={errors.publication}
                onButtonClick={() => document.getElementById("publicationFileInput").click()}
                onFileRemove={(index) => setPublicationFiles(publicationFiles.filter((_, i) => i !== index))}
                inputId="publicationFileInput"
              />
              <input
                id="publicationFileInput"
                type="file"
                onChange={handlePublicationFileChange}
                className="hidden"
              />
            </div>

            <div className="border-t border-gray-200 pt-6">
              <FileUploadSection
                title="Proof File"
                buttonLabel="Choose Proof"
                files={proofFiles}
                hasError={errors.proof}
                onButtonClick={() => document.getElementById("proofFileInput").click()}
                onFileRemove={(index) => setProofFiles(proofFiles.filter((_, i) => i !== index))}
                inputId="proofFileInput"
              />
              <input
                id="proofFileInput"
                type="file"
                onChange={handleProofFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Description</h2>
          <div className="w-full">
            <DescriptionTextarea
              description={description}
              onChange={handleDescriptionChange}
              hasError={errors.description}
            />
          </div>
        </div>

        {/* Submit Button Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex justify-end">
          <SubmitButton onClick={handleSubmitClick} />
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Upload;
