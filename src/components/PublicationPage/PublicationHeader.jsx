function PublicationHeader({ title, status, isBookmarked, isAnimating, onBookmarkClick }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            status === 'verified' ? 'bg-green-100 text-green-800' :
            status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkClick();
        }}
        className={`transition-transform duration-200 ${isBookmarked ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-800 hover:text-gray-900'} ${isAnimating ? 'scale-0' : 'scale-100'}`}
      >
        {isBookmarked ? (
          <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default PublicationHeader;
