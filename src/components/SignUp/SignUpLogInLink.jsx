import { Link } from 'react-router-dom';

function SignUpLogInLink() {
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
          .login-link {
            animation: slideInLeft 0.5s ease-out;
          }
          .login-link:hover {
            animation: slideInLeft 0.3s ease-out;
          }
        `}
      </style>
      <p className="text-center text-gray-700 text-sm mt-6 login-link">
        Already have an account?{" "}
        <Link to="/login" className="text-black hover:text-gray-700 font-medium transition-all duration-300 hover:translate-x-1 inline-block">
          Log in here
        </Link>
      </p>
    </>
  );
}

export default SignUpLogInLink;