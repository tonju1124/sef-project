function LoginFormFooter() {
  return (
    <div className="flex items-center justify-between text-sm mb-5">
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-400 bg-white text-black focus:ring-black"
        />
        <span className="text-gray-700 group-hover:text-black transition-colors">
          Remember me
        </span>
      </label>
      <a
        href="#"
        className="text-black hover:text-gray-700 transition-colors"
      >
        Forgot password?
      </a>
    </div>
  );
}

export default LoginFormFooter;
