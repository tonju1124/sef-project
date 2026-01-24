import { Link } from 'react-router-dom';

function LoginSignUpLink() {
  return (
    <p className="text-center text-gray-700 text-sm mt-6">
      Don't have an account?{" "}
      <Link to="/signup" className="text-black hover:text-gray-700 font-medium">
        Sign up here
      </Link>
    </p>
  );
}

export default LoginSignUpLink;
