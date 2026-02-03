import { useNavigate } from 'react-router-dom';

/**
 * UploadPublicationButton Component
 * 
 * A button that navigates to the publication upload page.
 * Displayed on the main page to allow users to publish their research.
 */
function UploadPublicationButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/upload');
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
