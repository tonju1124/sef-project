import { useState, useRef, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../config/supabaseClient";

/**
 * CustomDropdown Component
 * 
 * A reusable custom dropdown menu with smooth animations and hover effects.
 * Displays selected value and toggles to show options list when clicked.
 **/
const CustomDropdown = ({ label, value, options, onChange, isOpen, dropdownRef, setOpenDropdown }) => (
  <div className="relative" ref={dropdownRef}>
    <button
      onClick={() => setOpenDropdown(isOpen ? null : label)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
    >
      <span>{options.find(opt => opt.value === value)?.label || value}</span>
      <svg
        className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 animate-slide-in">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setOpenDropdown(null);
            }}
            className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors ${value === option.value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

/**
 * UserProfileCard Component
 * 
 * Displays and manages user profile information with view/edit modes.
 * Supports editing profile details including faculty, and biography.
 * Includes form validation, custom dropdowns, and animated transitions between view and edit modes.
 */
function UserProfileCard() {
  const { user, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [customFaculty, setCustomFaculty] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [saving, setSaving] = useState(false);
  const dropdownRef = useRef(null);
  const titleDropdownRef = useRef(null);
  const facultyDropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    faculty: '',
    email: '',
    role: '',
    phone: '',
    scholarLink: '',
    bio: ''
  });

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        title: user.title || '',
        name: user.fullName || user.userID || '',
        faculty: user.faculty || '',
        email: user.userID || '',
        role: user.role || '',
        phone: user.phone || '',
        scholarLink: user.scholarLink || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (titleDropdownRef.current && !titleDropdownRef.current.contains(event.target)) &&
        (facultyDropdownRef.current && !facultyDropdownRef.current.contains(event.target))
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading || !user) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-full">
        <p className="text-gray-500 text-center py-8">Loading profile...</p>
      </div>
    );
  }

  /**
   * Handles changes to form input fields
   * Updates the formData state with the new value from the input field
   **/
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles faculty selection changes from the dropdown
   * If "Others" is selected, prepares the form for custom faculty input
   * Otherwise, sets the selected faculty and clears custom input
   **/
  const handleFacultyChange = (value) => {
    if (value === "Others") {
      setFormData(prev => ({
        ...prev,
        faculty: "Others"
      }));
      setCustomFaculty("");
    } else {
      setFormData(prev => ({
        ...prev,
        faculty: value
      }));
      setCustomFaculty("");
    }
  };

  /**
   * Handles changes to the custom faculty input field
   * Updates the customFaculty state when user types a custom faculty name
   **/
  const handleCustomFacultyChange = (e) => {
    const value = e.target.value;
    setCustomFaculty(value);
  };

  /**
   * Handles saving the edited profile information
   * Updates the profile in Supabase database
   */
  const handleSave = async () => {
    setSaving(true);
    try {
      const finalFaculty = customFaculty && formData.faculty === "Others" ? customFaculty : formData.faculty;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          title: formData.title,
          full_name: formData.name,
          faculty: finalFaculty,
          phone: formData.phone,
          scholar_link: formData.scholarLink,
          bio: formData.bio
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        alert('Failed to save profile. Please try again.');
        return;
      }

      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        faculty: finalFaculty
      }));
      
      // Refresh user data
      window.location.reload();
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Check if bio exceeds 200 characters to show "Read More" button
  const bioExceedsLimit = formData.bio && formData.bio.length > 200;

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-in;
          }
          .animate-slide-in {
            animation: slideIn 0.4s ease-out;
          }
          .shake-animation {
            animation: shake 0.5s ease-in-out;
          }
        `}
      </style>

      {!isEditing ? (
        <>
          {/* Profile Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 w-full animate-fade-in">
            {/* Profile Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <h2 className="text-2xl font-bold">{formData.name || 'User'}</h2>
              </div>
              <p className="text-gray-600 mb-2">{formData.email}</p>
              <div className="mb-4">
                <p className="text-gray-600 text-sm">Bio</p>
                <p className={`text-gray-700 text-xs ${!bioExpanded ? 'line-clamp-4' : ''} ${!formData.bio || !formData.bio.trim() ? 'italic text-gray-400' : ''}`}>
                  {formData.bio && formData.bio.trim() ? formData.bio : 'This User is Lazy to Set up a Bio'}
                </p>
              </div>
              {bioExceedsLimit && (
                <button
                  onClick={() => setBioExpanded(!bioExpanded)}
                  className="text-blue-600 hover:underline text-sm font-medium mb-3"
                >
                  {bioExpanded ? 'Read Less...' : 'Read More...'}
                </button>
              )}
              {formData.phone && (
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="text-gray-700">{formData.phone}</p>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="space-y-4 pb-8 border-b border-gray-300 mb-8">
              <div>
                <p className="text-gray-600 text-sm">Role</p>
                <p className="text-gray-900 capitalize">{formData.role}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Faculty</p>
                <p className="text-gray-900">{formData.faculty || 'Not set'}</p>
              </div>
              {formData.scholarLink && (
                <div>
                  <p className="text-gray-600 text-sm">Scholar Link</p>
                  <p className="text-blue-600 hover:underline">
                    <a href={formData.scholarLink} target="_blank" rel="noopener noreferrer">{formData.scholarLink}</a>
                  </p>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Edit Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 w-full animate-slide-in">
            <h2 className="text-2xl font-bold mb-8">Edit Personal Information</h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                <CustomDropdown
                  label="title"
                  value={formData.title}
                  options={[
                    { value: "Mr.", label: "Mr." },
                    { value: "Mrs.", label: "Mrs." },
                    { value: "Miss.", label: "Miss." },
                    { value: "Ms.", label: "Ms." },
                    { value: "Dr.", label: "Dr." },
                    { value: "Prof.", label: "Prof." }
                  ]}
                  onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                  isOpen={openDropdown === "title"}
                  dropdownRef={titleDropdownRef}
                  setOpenDropdown={setOpenDropdown}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm fo  nt-medium text-gray-900 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600 capitalize"
                />
              </div>

              {/* Faculty */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Faculty</label>
                <CustomDropdown
                  label="faculty"
                  value={formData.faculty === "Others" || (customFaculty && formData.faculty !== "FCI - Faculty of Computing and Informatics" && formData.faculty !== "FOM" && formData.faculty !== "FCM" && formData.faculty !== "FAC" && formData.faculty !== "FAIE") ? "Others" : formData.faculty}
                  options={[
                    { value: "FCI - Faculty of Computing and Informatics", label: "FCI - Faculty of Computing and Informatics" },
                    { value: "FOM - Faculty of Accountancy and Management", label: "FOM - Faculty of Accountancy and Management" },
                    { value: "FCM - Faculty of Commerce and Management", label: "FCM - Faculty of Commerce and Management" },
                    { value: "FAC - Faculty of Arts and Communication", label: "FAC - Faculty of Arts and Communication" },
                    { value: "FAIE - Faculty of Applied Information and Engineering", label: "FAIE - Faculty of Applied Information and Engineering" },
                    { value: "Others", label: "Others" }
                  ]}
                  onChange={handleFacultyChange}
                  isOpen={openDropdown === "faculty"}
                  dropdownRef={facultyDropdownRef}
                  setOpenDropdown={setOpenDropdown}
                />
                {formData.faculty === "Others" ? (
                  <input
                    type="text"
                    value={customFaculty}
                    onChange={handleCustomFacultyChange}
                    placeholder="Enter your faculty name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                  />
                ) : null}
              </div>

              {/* Scholar Link */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Scholar Link</label>
                <input
                  type="url"
                  name="scholarLink"
                  value={formData.scholarLink}
                  onChange={handleInputChange}
                  placeholder="https://scholar.google.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+60 12-3456789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Biography */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Biography</label>
                <div className="relative">
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows="4"
                    maxLength="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <p className={`text-right text-xs mt-1 ${formData.bio && formData.bio.length === 1000 ? 'text-red-500 shake-animation font-semibold' : 'text-gray-500'}`}>
                    {formData.bio ? formData.bio.length : 0}/1000
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={saving}
                className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserProfileCard;
