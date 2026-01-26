import { useState } from "react";
import LoginSignupSidebar from "./components/LoginSignupSidebar";
import LoginHeader from "./components/Login/LoginHeader";
import LoginAlert from "./components/Login/LoginAlert";
import LoginInputField from "./components/Login/LoginInputField";
import LoginFormFooter from "./components/Login/LoginFormFooter";
import LoginSubmitButton from "./components/Login/LoginSubmitButton";
import LoginSignUpLink from "./components/Login/LoginSignUpLink";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!username.trim()) {
      setError("Username is required");
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
      setUsername("");
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

          {/* Form Card */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <LoginAlert type="error" message={error} />}
              {success && <LoginAlert type="success" message="" />}

              <LoginInputField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                isPasswordField={false}
              />

              <LoginInputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                isPasswordField={true}
              />

              <LoginFormFooter />

              <LoginSubmitButton isLoading={isLoading} />
            </form>

            <LoginSignUpLink />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
