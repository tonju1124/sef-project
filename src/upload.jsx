import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { supabase } from "./config/supabaseClient";
import BackButton from "./components/Upload/BackButton";
import PublicationTypeDropdown from "./components/Upload/PublicationTypeDropdown";
import FileUploadSection from "./components/Upload/FileUploadSection";
import FormInput from "./components/Upload/FormInput";
import CoAuthorSection from "./components/Upload/CoAuthorSection";
import DescriptionTextarea from "./components/Upload/DescriptionTextarea";
import SubmitButton from "./components/Upload/SubmitButton";
import PublicationSuccessModal from "./components/Upload/PublicationSuccessModal";

/**
 * Upload Component
 * 
 * Page for uploading new research publications.
 * Provides a comprehensive form for entering publication details, uploading files,
 * and submitting for verification.
 */
function Upload() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("Journal");
  const [title, setTitle] = useState("");
  const [coAuthorName, setCoAuthorName] = useState("");
  const [showCoAuthorInput, setShowCoAuthorInput] = useState(false);
  const [description, setDescription] = useState("");
  const [publicationFiles, setPublicationFiles] = useState([]);
  const [proofFiles, setProofFiles] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    publication: false,
    proof: false
  });

  // Transition effect when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Handles file selection for publication documents
   * Validates file types (PDF, DOC, DOCX, TXT) and updates state
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event
   */
  const handlePublicationFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return !allowedTypes.includes(extension);
    });
    
    if (invalidFiles.length > 0) {
      setUploadError(`Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.`);
      return;
    }
    
    setPublicationFiles(files);
    setErrors({ ...errors, publication: false });
    setUploadError("");
  };

  /**
   * Handles file selection for proof documents
   * Validates file types (PDF, DOC, DOCX, TXT) and updates state
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event
   */
  const handleProofFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const invalidFiles = files.filter(file => {
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      return !allowedTypes.includes(extension);
    });
    
    if (invalidFiles.length > 0) {
      setUploadError(`Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.`);
      return;
    }
    
    setProofFiles(files);
    setErrors({ ...errors, proof: false });
    setUploadError("");
  };

  /**
   * Handles changes to the title input field
   * Updates title state and clears title error if input is not empty
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The title input change event
   */
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") {
      setErrors({ ...errors, title: false });
    }
  };

  /**
   * Handles changes to the description textarea
   * Enforces 1000 character limit and clears description error if input is not empty
   * 
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The description textarea change event
   */
  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 1000) {
      setDescription(e.target.value);
      if (e.target.value.trim() !== "") {
        setErrors({ ...errors, description: false });
      }
    }
  };

  /**
   * Gets today's date in YYYY-MM-DD format
   * Used for setting the upload date of new publications
   * 
   * @returns {string} Current date in YYYY-MM-DD format
   */
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * Generates the next available publication ID
   * Finds the maximum ID in existing publications and increments by 1
   * 
   * @returns {number} The next unique publication ID
   */
  const getNextId = () => {
    return Math.max(...publications.map(p => p.id)) + 1;
  };

  /**
   * Uploads a file to Supabase Storage
   * @param {File} file - The file to upload
   * @param {string} folder - The folder path in storage
   * @returns {Promise<string>} The public URL of the uploaded file
   */
  const uploadFileToStorage = async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('publication-files')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
    }

    // Get public URL
    const { data } = supabase.storage
      .from('publication-files')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  /**
   * Handles form submission for creating a new publication
   * Validates all required fields, uploads files to storage, creates publication in database
   */
  const handleSubmitClick = async () => {
    const newErrors = {
      title: title.trim() === "",
      description: description.trim() === "",
      publication: publicationFiles.length === 0,
      proof: proofFiles.length === 0
    };
    setErrors(newErrors);

    if (newErrors.title || newErrors.description || newErrors.publication || newErrors.proof) {
      setUploadError("Please fill in all required fields");
      return;
    }

    if (!user || !user.id) {
      setUploadError("You must be logged in to upload publications");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      // Get the current authenticated user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !authUser) {
        throw new Error("You must be logged in to upload publications");
      }

      // Upload publication files
      const publicationUrls = [];
      for (const file of publicationFiles) {
        const url = await uploadFileToStorage(file, 'publications');
        publicationUrls.push(url);
      }

      // Upload proof files
      const proofUrls = [];
      for (const file of proofFiles) {
        const url = await uploadFileToStorage(file, 'proofs');
        proofUrls.push(url);
      }

      // Insert publication into database
      const { data, error: insertError } = await supabase
        .from('publications')
        .insert([
          {
            title: title.trim(),
            author_id: authUser.id,
            co_authors: coAuthorName.trim() || null,
            description: description.trim(),
            publication_type: selectedType.toLowerCase(),
            publication_files: publicationUrls,
            proof_files: proofUrls,
            status: 'pending',
            is_hidden: false,
          }
        ])
        .select();

      if (insertError) {
        throw new Error(`Failed to create publication: ${insertError.message}`);
      }

      // Create notification for the user
      if (data && data[0]) {
        const publicationId = data[0].id;
        console.log('Creating notification for user:', authUser.id);
        console.log('Publication title:', title.trim());
        
        const { data: notifData, error: notifError } = await supabase
          .from('notifications')
          .insert([
            {
              user_id: authUser.id,
              title: 'Publication Reviewing',
              message: title.trim(),
              is_read: false
            }
          ])
          .select();

        if (notifError) {
          console.error('Error creating notification:', notifError);
          console.error('Error details:', notifError.message, notifError.code);
        } else {
          console.log('Notification created successfully:', notifData);
        }
      }

      // Success! Reset all fields
      setTitle("");
      setCoAuthorName("");
      setDescription("");
      setSelectedType("Journal");
      setPublicationFiles([]);
      setProofFiles([]);
      setErrors({ title: false, description: false, publication: false, proof: false });
      setShowSuccessModal(true);
      
      console.log('Publication created successfully:', data);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload publication. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Show loading transition
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-800">Loading Upload Page</h2>
          <p className="text-gray-600 mt-2">Preparing your workspace...</p>
        </div>
        <style>
          {`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.5s ease-out;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 text-black flex flex-col select-none p-8 animate-slide-up">
      <style>
        {`
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.4s ease-out;
          }
        `}
      </style>
      {showSuccessModal && <PublicationSuccessModal onClose={() => setShowSuccessModal(false)} />}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        <BackButton />

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Publish Your Research</h1>
          <p className="text-gray-600">Share your academic publication with the community</p>
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{uploadError}</span>
            </div>
          </div>
        )}

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
                {user.userID}
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
                accept=".pdf,.doc,.docx,.txt"
                multiple
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
                accept=".pdf,.doc,.docx,.txt"
                multiple
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
          <button
            onClick={handleSubmitClick}
            disabled={isUploading}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading...
              </>
            ) : (
              'Submit Publication'
            )}
          </button>
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
