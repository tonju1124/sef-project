import { useState } from "react";
import "./upload.css";
import BackButton from "./components/Upload/BackButton";
import PublicationTypeDropdown from "./components/Upload/PublicationTypeDropdown";
import FileUploadSection from "./components/Upload/FileUploadSection";
import FormInput from "./components/Upload/FormInput";
import CoAuthorSection from "./components/Upload/CoAuthorSection";
import DescriptionTextarea from "./components/Upload/DescriptionTextarea";
import SubmitButton from "./components/Upload/SubmitButton";

function Upload() {
  const [selectedType, setSelectedType] = useState("Journal");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [coAuthorName, setCoAuthorName] = useState("");
  const [showCoAuthorInput, setShowCoAuthorInput] = useState(false);
  const [description, setDescription] = useState("");
  const [publicationFiles, setPublicationFiles] = useState([]);
  const [proofFiles, setProofFiles] = useState([]);
  const [errors, setErrors] = useState({
    title: false,
    authorName: false,
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

  const handleAuthorNameChange = (e) => {
    setAuthorName(e.target.value);
    if (e.target.value.trim() !== "") {
      setErrors({ ...errors, authorName: false });
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

  const handleSubmitClick = () => {
    const newErrors = {
      title: title.trim() === "",
      authorName: authorName.trim() === "",
      description: description.trim() === "",
      publication: publicationFiles.length === 0,
      proof: proofFiles.length === 0
    };
    setErrors(newErrors);

    if (newErrors.title || newErrors.authorName || newErrors.description || newErrors.publication || newErrors.proof) {
      return;
    }

    // Reset all fields
    setTitle("");
    setAuthorName("");
    setCoAuthorName("");
    setDescription("");
    setSelectedType("Journal");
    setPublicationFiles([]);
    setProofFiles([]);
    setErrors({ title: false, authorName: false, description: false, publication: false, proof: false });
  };

  return (
    <div className="flex flex-col p-12 bg-white text-black select-none">
      <div className="flex flex-col gap-1.5">
        <BackButton />

        <PublicationTypeDropdown
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <FileUploadSection
          title="Upload Your Academic Publication"
          buttonLabel="Add Publication"
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

        <FileUploadSection
          title="Upload Your Publication Proof"
          buttonLabel="Add Proof"
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

        <FormInput
          label="Title:"
          value={title}
          onChange={handleTitleChange}
          placeholder={errors.title ? "Title is required" : "Enter Title"}
          hasError={errors.title}
        />

        <FormInput
          label="Please Enter Author Name:"
          value={authorName}
          onChange={handleAuthorNameChange}
          placeholder={errors.authorName ? "Author Name is required" : "Enter Author Name"}
          hasError={errors.authorName}
        />

        <CoAuthorSection
          coAuthorName={coAuthorName}
          setCoAuthorName={setCoAuthorName}
          showCoAuthorInput={showCoAuthorInput}
          setShowCoAuthorInput={setShowCoAuthorInput}
        />

        <DescriptionTextarea
          description={description}
          onChange={handleDescriptionChange}
          hasError={errors.description}
        />

        <SubmitButton onClick={handleSubmitClick} />
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
