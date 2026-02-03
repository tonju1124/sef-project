/**
 * LoginAlert Component
 * 
 * Displays success or error alerts for the login form.
 * Shows different styled messages based on the alert type with appropriate icons.
 */
function LoginAlert({ type, message }) {
  if (type === "error") {
    return (
      <div className="bg-red-100 border border-red-400 rounded-lg p-3 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-red-600 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <span className="text-red-700 text-sm">{message}</span>
      </div>
    );
  }

  if (type === "success") {
    return (
      <div className="bg-green-100 border border-green-400 rounded-lg p-3 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-green-600 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span className="text-green-700 text-sm">
          Login successful! Redirecting...
        </span>
      </div>
    );
  }

  return null;
}

export default LoginAlert;
