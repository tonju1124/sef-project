import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import LoginAlert from "../Login/LoginAlert";
import SignUpLogInLink from "./SignUpLogInLink";
import SignUpFields from "./SignUpFields";

/**
 * SignUpForm Component
 * 
 * The main registration form containing all input fields for account creation.
 * Uses Supabase to create user accounts and profiles.
 */
function SignUpForm() {
  const navigate = useNavigate();
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
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleRoleChange = (value) => {
    setRole(value);
    setError(""); // Clear error when user selects a role
    setRoleError(false);
  };

  const handleFacultyChange = (value) => {
    if (value === "Others") {
      setFaculty("Others");
    } else {
      setFaculty(value);
      setCustomFaculty("");
    }
    setError(""); // Clear error when user selects a faculty
    setFacultyError(false);
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
    setHasAttemptedSubmit(true);

    // Validate fields one by one and return first error
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Incorrect email format");
      return false;
    }

    if (!role.trim()) {
      setError("Please select a role");
      setRoleError(true);
      return false;
    }
    setRoleError(false);

    if (!faculty.trim()) {
      setError("Please select a Faculty");
      setFacultyError(true);
      return false;
    }
    setFacultyError(false);

    if (faculty === "Others" && !customFaculty.trim()) {
      setError("Faculty name is required");
      setCustomFacultyError(true);
      return false;
    }
    setCustomFacultyError(false);

    if (!password || !confirmPassword) {
      setError("Please confirm your password");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        setError(signUpError.message || "Signup failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Get the new user ID
      const userId = data.user.id;
      const finalFaculty = faculty === "Others" ? customFaculty : faculty;

      // Create user profile in the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            email: email,
            role: role,
            faculty: finalFaculty,
            is_active: true,
          },
        ]);

      if (profileError) {
        setError("Profile creation failed: " + profileError.message);
        setIsLoading(false);
        return;
      }

      // Success!
      setSuccess(true);
      console.log("Signup successful! User:", email);

      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setFaculty("");
      setCustomFaculty("");
      setRoleError(false);
      setFacultyError(false);
      setCustomFacultyError(false);

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
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
          setEmail={(value) => {
            setEmail(value);
            setError(""); // Clear error when typing
          }}
          password={password}
          setPassword={(value) => {
            setPassword(value);
            setError(""); // Clear error when typing
          }}
          confirmPassword={confirmPassword}
          setConfirmPassword={(value) => {
            setConfirmPassword(value);
            setError(""); // Clear error when typing
          }}
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
          roleError={hasAttemptedSubmit && roleError}
          facultyError={hasAttemptedSubmit && facultyError}
          customFacultyError={hasAttemptedSubmit && customFacultyError}
          setCustomFacultyError={setCustomFacultyError}
        />
        
        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <SignUpLogInLink />
    </div>
  );
}

export default SignUpForm;
