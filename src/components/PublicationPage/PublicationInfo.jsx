/**
 * PublicationInfo Component
 * 
 * Displays metadata about the publication (author, date, category).
 * Shown in a grid layout on the publication detail page.
 */
function PublicationInfo({ author, coauthor, uploadDate, category, formatDate }) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">Author</p>
        <p className="text-gray-800 text-lg">{author}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">Co-author</p>
        <p className="text-gray-800 text-lg italic">{coauthor || "None"}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">Upload Date</p>
        <p className="text-gray-800 text-lg">{formatDate(uploadDate)}</p>
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">Category</p>
        <p className="text-gray-800 text-lg">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
      </div>
    </div>
  );
}

export default PublicationInfo;
