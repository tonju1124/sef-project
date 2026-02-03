import LoginSignupSidebar from "./components/LoginSignupSidebar";
import SignUpHeader from "./components/SignUp/SignUpHeader";
import SignUpForm from "./components/SignUp/SignUpForm";

/**
 * SignUp Component
 * 
 * The registration page for new users to create an account.
 * Provides a form to enter user details including role, faculty, and credentials.
 */
function SignUp() {
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
          .signup-container {
            animation: fadeInUp 0.6s ease-out;
          }
        `}
      </style>
      <LoginSignupSidebar />

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 signup-container">
        <div className="w-full max-w-md">
          <SignUpHeader />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;