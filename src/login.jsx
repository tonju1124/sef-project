import { useState } from "react";

function LogIn() {
  return (
    <div className="bg-white text-black flex h-screen items-center justify-between px-8">
      <h1 className="text-[5.6rem] font-semibold w-132">
        Welcome to ArticleAPRT
      </h1>
      <div className="border-r border-black h-full"></div>
      <div className="bg-bg-secondary rounded-sm flex flex-col justify-center items-center font-semibold text-black text-[1.5rem] px-10 py-6 gap-5">
        Please sign in with your account
        {/* Username Input Field */}
        <div className="flex items-center bg-textbox-login border rounded-sm px-4 py-2 w-full gap-3 hover:bg-textbox-login-hover transition-all duration-200">
          <svg
            className="w-6 h-6 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <input
            type="text"
            className="bg-transparent outline-none flex-1 text-lg"
            placeholder="Username"
          />
        </div>
        {/* Password Input Field */}
        <div className="flex items-center bg-textbox-login border rounded-sm px-4 py-2 w-full gap-3 hover:bg-textbox-login-hover transition-all duration-200">
          <svg
            className="w-6 h-6 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
          </svg>
          <input
            type="password"
            className="bg-transparent outline-none flex-1 text-lg"
            placeholder="Password"
          />  
          <svg
            className="w-6 h-6 text-black cursor-pointer hover:scale-105 transition-all duration-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
}
export default LogIn;
