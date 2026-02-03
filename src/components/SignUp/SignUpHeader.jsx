/**
 * SignUpHeader Component
 * 
 * Displays the welcoming header for the sign-up page.
 * Shows the page title and a brief call-to-action description.
 */
function SignUpHeader() {
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold text-black mb-2">Create an Account</h1>
      <p className="text-gray-600">Sign up to get started</p>
    </div>
  );
}

export default SignUpHeader;
