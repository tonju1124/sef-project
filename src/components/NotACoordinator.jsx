import { useNavigate } from 'react-router-dom';

function NotACoordinatorError() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center">
      {/* Background blur overlay */}
      <div className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-lg z-40 cursor-pointer animate-fadeIn" onClick={() => navigate('/')} />
      
      {/* Error message box */}
      <div className="relative z-50 bg-white rounded-xl shadow-2xl p-8 max-w-md text-center animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You are not a coordinator. You don't have access to this page.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotACoordinatorError;
