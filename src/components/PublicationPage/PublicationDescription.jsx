function PublicationDescription({ description }) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap wrap-break-word overflow-wrap-break-word">{description}</p>
    </div>
  );
}

export default PublicationDescription;
