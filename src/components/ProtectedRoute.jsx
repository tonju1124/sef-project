import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * ProtectedRoute Component
 * 
 * Wrapper component that checks if user is authenticated.
 * If not logged in, redirects to login page.
 * If logged in, renders the requested component.
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the component
  return children;
}

export default ProtectedRoute;
