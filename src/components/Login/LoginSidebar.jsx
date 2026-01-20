function LoginSidebar() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-bg-gradient-start to-bg-gradient-end text-white flex-col items-center justify-center p-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg mb-6">
        <svg
          className="w-8 h-8 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25m0 0c0 .21.011.42.033.63M2 17.25h20m-20 0c-.012.21-.023.42-.033.63m20-.63v-.75a9.001 9.001 0 00-17.25-6.811c-.088.185-.174.371-.257.557M12 6.253l7.5-3.365"
          />
        </svg>
      </div>
      <h2 className="text-5xl font-bold text-center align-middle w-[40%]">
        {" "}
        Welcome to ArticleAPRT
      </h2>
    </div>
  );
}

export default LoginSidebar;
