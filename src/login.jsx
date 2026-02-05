import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./config/supabaseClient";
import LoginSignupSidebar from "./components/LoginSignupSidebar";
import LoginHeader from "./components/Login/LoginHeader";
import LoginForm from "./components/Login/LoginForm";

/**
 * LogIn Component
 * 
 * The login page allowing users to authenticate with their credentials.
 * Uses Supabase authentication for email/password login.
 */
function LogIn() {
  const navigate = useNavigate();
  const [id, setId] = useState(""); // Using email as ID
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load saved email if user had checked "Remember Me"
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const wasSavedBefore = localStorage.getItem('rememberMe');
    if (savedEmail && wasSavedBefore === 'true') {
      setId(savedEmail);
      setRememberMe(true);
    }
  }, []);

  /**
   * Handles form submission for user login
   * Authenticates with Supabase using email and password
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!id.trim()) {
      setError("Email is required");
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
      // Sign in with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: id,
        password: password,
      });

      if (signInError) {
        setError(signInError.message || "Login failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      // Check if user account is active
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_active')
        .eq('id', data.user.id)
        .single();

      console.log('Profile check - User ID:', data.user.id);
      console.log('Profile data:', profileData);
      console.log('Profile error:', profileError);

      if (profileError) {
        console.error('Error checking user status:', profileError);
        setError("Unable to verify account status. Please try again.");
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      if (!profileData || !profileData.is_active) {
        setError("Your account has been deactivated. Please contact an administrator.");
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      // Handle Remember Me
      if (rememberMe) {
        localStorage.setItem('savedEmail', id);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.setItem('rememberMe', 'false');
      }

      // Login successful
      setSuccess(true);
      console.log("Login successful! User:", data.user.email);
      
      // Clear form
      setId("");
      setPassword("");
      
      // Redirect to main page after short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
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
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
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
