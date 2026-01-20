function LoginInputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  showPassword,
  onTogglePassword,
  isPasswordField,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        {label}
      </label>
      <div className="relative">
        {isPasswordField ? (
          <>
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.83 9L15.29 12.46c.04-.32.07-.64.07-.96 0-1.66-1.34-3-3-3-.32 0-.64.03-.96.07L11.83 9M7.53 9.8L6.63 8.9c-1.23 1.23-1.9 2.88-1.9 4.61 0 1.73.67 3.38 1.9 4.61 1.23 1.23 2.88 1.9 4.61 1.9s3.38-.67 4.61-1.9l-.9-.9c-1.02 1.02-2.37 1.58-3.71 1.58-1.34 0-2.69-.56-3.71-1.58C6.99 14.41 6.43 13.06 6.43 11.72c0-1.34.56-2.69 1.1-3.92zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.73 11c0 .36.03.69.1 1.02l3.19 3.19c.33-.07.66-.1 1.02-.1 1.66 0 3 1.34 3 3 0 .36-.03.69-.1 1.02l3.19 3.19c.34-.33.64-.71.89-1.1 1.23-1.23 1.9-2.88 1.9-4.61 0-1.73-.67-3.38-1.9-4.61-1.23-1.23-2.88-1.9-4.61-1.9-1.73 0-3.38.67-4.61 1.9-.39.25-.77.55-1.1.89L7.73 11z" />
                </svg>
              )}
            </button>
          </>
        ) : (
          <>
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
              placeholder={placeholder}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default LoginInputField;
