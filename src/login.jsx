import { useState } from "react";
import LoginSignupSidebar from "./components/LoginSignupSidebar";
import LoginHeader from "./components/Login/LoginHeader";
import LoginForm from "./components/Login/LoginForm";

/**
 * LogIn Component
 * 
 * The login page allowing users to authenticate with their credentials.
 * Includes form validation, loading states, and error/success messaging.
 */
function LogIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /**
   * Handles form submission for user login
   * Validates input fields, simulates API call, and manages success/error states
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!id.trim()) {
      setError("ID is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setId("");
      setPassword("");
      console.log("Login successful");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex select-none">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .login-container {
            animation: fadeInUp 0.6s ease-out;
          }
        `}
      </style>
      <LoginSignupSidebar />

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 login-container">
        <div className="w-full max-w-md">
          <LoginHeader />

          <LoginForm
            id={id}
            setId={setId}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            error={error}
            success={success}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
export default LogIn;
