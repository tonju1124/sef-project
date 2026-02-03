/**
 * LoginHeader Component
 * 
 * Displays the welcoming header for the login page.
 * Shows the page title and a brief description.
 */
function LoginHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
      <p className="text-gray-600">Sign in to your account to continue</p>
    </div>
  );
}

export default LoginHeader;
