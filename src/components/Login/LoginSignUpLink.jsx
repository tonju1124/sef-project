import { Link } from 'react-router-dom';

function LoginSignUpLink() {
  return (
    <>
      <style>
        {`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .signup-link {
            animation: slideInLeft 0.5s ease-out;
          }
          .signup-link:hover {
            animation: slideInLeft 0.3s ease-out;
          }
        `}
      </style>
      <p className="text-center text-gray-700 text-sm mt-6 signup-link">
        Don't have an account?{" "}
        <Link to="/signup" className="text-black hover:text-gray-700 font-medium transition-all duration-300 hover:translate-x-1 inline-block">
          Sign up here
        </Link>
      </p>
    </>
  );
}

export default LoginSignUpLink;
