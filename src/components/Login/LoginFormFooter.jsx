import { Link } from 'react-router-dom';

/**
 * LoginFormFooter Component
 * 
 * Displays a "Remember me" checkbox and "Forgot Password" link for the login form.
 * Positioned between the input fields and submit button.
 */
function LoginFormFooter({ rememberMe, setRememberMe }) {
  return (
    <div className="flex items-center justify-between text-sm mb-5">
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-gray-400 bg-white text-black focus:ring-black cursor-pointer"
        />
        <span className="text-gray-700 group-hover:text-black transition-colors">
          Remember me
        </span>
      </label>
      <Link 
        to="/forgot-password"
        className="text-gray-600 hover:text-black transition-colors font-medium"
      >
        Forgot Password?
      </Link>
    </div>
  );
}

export default LoginFormFooter;
