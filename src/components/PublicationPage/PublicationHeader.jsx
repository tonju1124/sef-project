/**
 * PublicationHeader Component
 * 
 * Displays the publication title and status badge.
 * Shows at the top of the publication detail page.
 **/

function PublicationHeader({ title, status }) {
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
    </div>
  );
}

export default PublicationHeader;
