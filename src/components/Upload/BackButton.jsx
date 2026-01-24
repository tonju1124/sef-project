import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button 
      onClick={handleClick}
      className="text-black border-2 border-gray-300 rounded-md py-1 px-3 font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer flex items-center gap-2 w-fit"
    >
      <span>&lt;</span>
      Back
    </button>
  );
}
