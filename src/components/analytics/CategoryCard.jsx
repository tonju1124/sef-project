/*
 * CategoryCard Component
 * Displays a collapsible category card for analytics with publication list.
 * Used in the Analytics page to show publications grouped by category.
 */
function CategoryCard({ category, count, isExpanded, onToggle, publications = [] }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-50 hover:border-gray-400 transition-all text-left cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-900">{category}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-blue-600">{count}</p>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-linear-to-b from-gray-50 to-white border-2 border-t-0 border-gray-300 rounded-b-lg p-6">
          {publications.length > 0 ? (
            <div className="max-h-32 overflow-y-auto">
              <ul className="space-y-2">
                {publications.map((pub, idx) => (
                  <li 
                    key={idx} 
                    className="text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-100 hover:text-gray-900 transition-all duration-150 cursor-pointer border-l-3 border-gray-300 hover:border-gray-500"
                  >
                    {pub.title || pub}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No publications in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
