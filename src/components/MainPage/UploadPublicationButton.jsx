function UploadPublicationButton() {
  const handleClick = () => {
    // Add your upload publication logic here
    console.log('Upload publication clicked');
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none font-medium"
    >
      Upload publication +
    </button>
  );
}

export default UploadPublicationButton;
