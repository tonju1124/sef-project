import { useState } from 'react';

function PublicationCard({ title, author, coauthor, uploadDate, description, bookmarked = false }) {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBookmarkClick = () => {
    setIsAnimating(true);
    setIsBookmarked(!isBookmarked);
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <div className="border-b border-gray-300 py-6 px-0">
      <div className="flex items-start justify-start gap-4">
        <div className="flex-row">
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-medium">Author:</span> {author}</p>
            <p><span className="font-medium">Coauthor:</span> {coauthor}</p>
            <p><span className="font-medium">Upload Date:</span> {uploadDate}</p>
            <p><span className="font-medium">Publication Description:</span> {description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button 
            onClick={handleBookmarkClick}
            className={`transition-transform duration-200 ${isBookmarked ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-800 hover:text-gray-900'} ${isAnimating ? 'scale-0' : 'scale-100'}`}
          >
            {isBookmarked ? (
              <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicationCard;
