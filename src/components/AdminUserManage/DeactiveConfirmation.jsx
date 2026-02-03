/**
 * DeactiveConfirmation Component
 * 
 * A confirmation modal for deactivating user accounts.
 * Displays user information and requires confirmation before deactivation.
 */
function DeactiveConfirmation({ userId, userEmail, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-100 bg-white bg-opacity-10 cursor-pointer animate-fadeIn" onClick={onCancel}>
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2m0 0h.01M6.938 3h10.124c1.105 0 2.015.895 2.015 2v15c0 1.105-.91 2-2.015 2H6.938c-1.106 0-2.015-.895-2.015-2V5c0-1.105.91-2 2.015-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Deactivation</h2>
          <p className="text-gray-600 mb-4">Are you sure you want to deactivate this user?</p>
          {/* Display user information for confirmation */}
          <div className="bg-gray-50 p-4 rounded-lg mb-3">
            <p className="text-sm text-gray-600">User ID: <span className="font-semibold text-gray-800">{userId}</span></p>
            <p className="text-sm text-gray-600 mt-2">Email: <span className="font-semibold text-gray-800">{userEmail}</span></p>
          </div>
        </div>
        {/* Action buttons: Cancel or Deactivate */}
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
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeactiveConfirmation;