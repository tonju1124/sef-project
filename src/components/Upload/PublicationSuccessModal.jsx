import { useNavigate } from 'react-router-dom';

function PublicationSuccessModal({ onClose }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center">
      {/* Background blur overlay */}
      <div className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-lg z-40 cursor-pointer animate-fadeIn" onClick={handleGoHome} />
      
      {/* Success message box */}
      <div className="relative z-50 bg-white rounded-xl shadow-2xl p-8 max-w-md text-center animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Publication Submitted!</h1>
        <p className="text-gray-600 mb-2">Your publication has been successfully submitted.</p>
        <p className="text-gray-500 text-sm mb-6">Status: <span className="font-semibold text-yellow-600">Pending</span></p>
        <button
          onClick={handleGoHome}
          className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default PublicationSuccessModal;
