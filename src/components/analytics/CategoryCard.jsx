function CategoryCard({ category, count, isExpanded, onToggle, publications = [] }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-5 py-3 border border-gray-300 rounded hover:bg-gray-100 transition-colors text-left cursor-pointer group"
      >
        <span className="text-2xl text-gray-800 transition-transform group-hover:scale-105">{category}</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl text-gray-800 transition-transform group-hover:scale-105">{count}</span>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-gray-50 border border-t-0 border-gray-300 rounded-b p-5">
          {publications.length > 0 ? (
            <div className="max-h-30 overflow-y-auto">
              <ul className="space-y">
                {publications.map((pub, idx) => (
                  <li key={idx} className="text-gray-700 text-base px-2 py-2 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                    {pub.title || pub}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600 text-base">No publications in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
