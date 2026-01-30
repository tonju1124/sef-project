function HideConfirmation({ publicationTitle, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 bg-white bg-opacity-10 cursor-pointer animate-fadeIn" onClick={onCancel}>
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
            <svg className="h-8 w-8 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hide Publication</h2>
          <p className="text-gray-600 mb-4">Are you sure you want to hide this publication?</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-3">
            <p className="text-sm text-gray-600">Title: <span className="font-semibold text-gray-800">{publicationTitle}</span></p>
          </div>
        </div>
        <div className="flex gap-4 justify-center pt-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition cursor-pointer hover:scale-105 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 font-semibold transition cursor-pointer hover:scale-105 active:scale-95"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  );
}

export default HideConfirmation;
