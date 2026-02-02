import { useState, useEffect } from "react";
import LoginAlert from "../Login/LoginAlert";
import LoginFormFooter from "../Login/LoginFormFooter";
import LoginSubmitButton from "../Login/LoginSubmitButton";
import SignUpLogInLink from "./SignUpLogInLink";
import SignUpFields from "./SignUpFields";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [faculty, setFaculty] = useState("");
  const [customFaculty, setCustomFaculty] = useState("");
  const [roleError, setRoleError] = useState(false);
  const [facultyError, setFacultyError] = useState(false);
  const [customFacultyError, setCustomFacultyError] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleFacultyChange = (value) => {
    if (value === "Others") {
      setFaculty("Others");
    } else {
      setFaculty(value);
      setCustomFaculty("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      setOpenDropdown(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CustomDropdown = ({ label, value, options, onChange, isOpen, hasError }) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : label)}
        className={`w-full px-4 py-2 border rounded-lg text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
          hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        } bg-white`}
      >
        <span className={hasError ? 'text-red-500' : ''}>{options.find(opt => opt.value === value)?.label || value}</span>
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

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!role.trim()) {
      setError("Please select a role");
      setRoleError(true);
      return false;
    }
    if (!faculty.trim()) {
      setError("Please select a Faculty");
      setFacultyError(true);
      return false;
    }
    if (faculty === "Others" && !customFaculty.trim()) {
      setError("Faculty name is required");
      setCustomFacultyError(true);
      return false;
    }
    setRoleError(false);
    setFacultyError(false);
    setCustomFacultyError(false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setFaculty("");
      setCustomFaculty("");
      setRoleError(false);
      setFacultyError(false);
      setCustomFacultyError(false);
      console.log("Signup successful");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
      <style>
        {`
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
          .animate-slide-in {
            animation: slideIn 0.4s ease-out;
          }
        `}
      </style>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <LoginAlert type="error" message={error} />}
        {success && <LoginAlert type="success" message="Account created successfully!" />}

        <SignUpFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          role={role}
          setRole={setRole}
          faculty={faculty}
          setFaculty={setFaculty}
          customFaculty={customFaculty}
          setCustomFaculty={setCustomFaculty}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          CustomDropdown={CustomDropdown}
          handleRoleChange={handleRoleChange}
          handleFacultyChange={handleFacultyChange}
          roleError={roleError}
          facultyError={facultyError}
          customFacultyError={customFacultyError}
          setCustomFacultyError={setCustomFacultyError}
        />
        <LoginSubmitButton isLoading={isLoading} />
      </form>

      <SignUpLogInLink />
    </div>
  );
}

export default SignUpForm;
