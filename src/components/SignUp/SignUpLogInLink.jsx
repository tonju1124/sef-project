import { Link } from 'react-router-dom';

function SignUpLogInLink() {
  return (
    <p className="text-center text-gray-700 text-sm mt-6">
      Already have an account?{" "}
      <Link to="/login" className="text-black hover:text-gray-700 font-medium">
        Log in here
      </Link>
    </p>
  );
}

export default SignUpLogInLink;