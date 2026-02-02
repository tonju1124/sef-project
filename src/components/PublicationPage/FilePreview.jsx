function FilePreview({ title, type = "PDF document" }) {
  return (
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="13 2 13 9 20 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-gray-600 font-medium mb-2">{title}</p>
      <p className="text-gray-500 text-sm mb-4">{type}</p>
      <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300">
        Download File
      </button>
    </div>
  );
}

export default FilePreview;
