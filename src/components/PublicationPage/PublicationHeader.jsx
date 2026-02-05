/**
 * PublicationHeader Component
 * 
 * Displays the publication title, status badge with icon, author, coauthor, and upload date.
 * Shows at the top of the publication detail page.
 * Status options: verified (checkmark), pending (clock), rejected (x)
 **/

function PublicationHeader({ title, status, author, coauthor, uploadDate }) {
  const getStatusIcon = () => {
    switch(status) {
      case 'verified':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            status === 'verified' ? 'bg-green-100 text-green-800' :
            status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {getStatusIcon()}
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        </div>
        
        {/* Author, Coauthor, and Upload Date */}
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Author:</span>
            <span>{author}</span>
          </div>
          {coauthor && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">Co-author:</span>
              <span>{coauthor}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-semibold">Upload Date:</span>
            <span>{uploadDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicationHeader;
