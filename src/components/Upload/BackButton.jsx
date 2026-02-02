import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button 
      onClick={handleClick}
      className="text-black border-2 border-gray-300 rounded-md py-1 px-3 font-semibold hover:bg-gray-100 hover:border-gray-400 focus:bg-gray-100 focus:border-gray-400 focus:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-2 w-fit outline-none"
    >
      <span>&lt;</span>
      Back
    </button>
  );
}
