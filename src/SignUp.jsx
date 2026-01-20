import LoginSignupSidebar from "./components/LoginSignupSidebar";
import SignUpHeader from "./components/SignUp/SignUpHeader";
import SignUpForm from "./components/SignUp/SignUpForm";

function SignUp() {
  return (
    <div className="min-h-screen bg-white flex select-none">
      <LoginSignupSidebar />

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <SignUpHeader />
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;