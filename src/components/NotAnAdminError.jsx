import { useNavigate } from 'react-router-dom';

function NotAnAdminError() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background blur overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-lg z-40" />
      
      {/* Error message box */}
      <div className="relative z-50 bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">You are not an admin. You don't have access to this page.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotAnAdminError;
