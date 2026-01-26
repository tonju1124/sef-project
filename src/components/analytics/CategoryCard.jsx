function CategoryCard({ category, count, isExpanded, onToggle, articles }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-gray-100 transition-colors"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">{category}</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{count}</span>
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </button>
      {isExpanded && (
        <div className="border-t border-gray-300 p-6 bg-gray-50 max-h-40 overflow-y-auto">
          {articles.length > 0 ? (
            <ul className="space-y-2">
              {articles.map((article, idx) => (
                <li key={idx} className="text-sm text-gray-700">• {article}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No articles saved</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryCard;
