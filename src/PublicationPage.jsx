import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import { useUser } from './context/UserContext';
import { publications } from './data/publications';

function PublicationPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  console.log('PublicationPage - URL id:', id, 'parsed:', parseInt(id));
  console.log('Available publications:', publications.map(p => ({ id: p.id, title: p.title })));
  
  const publication = publications.find(pub => pub.id === parseInt(id));
  
  console.log('Found publication:', publication);

  const [isBookmarked, setIsBookmarked] = useState(publication?.bookmarked || false);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!publication) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Publication Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const toggleBookmark = () => {
    setIsAnimating(true);
    setIsBookmarked(!isBookmarked);
    publication.bookmarked = !publication.bookmarked;
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
      <div className={`z-20 w-full pr-20 ${navOpen ? "blur-sm" : ""}`}>
        {/* Main Content Container */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          {/* Header with Title and Bookmark */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{publication.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  publication.status === 'verified' ? 'bg-green-100 text-green-800' :
                  publication.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {publication.status.charAt(0).toUpperCase() + publication.status.slice(1)}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark();
              }}
              className={`transition-transform duration-200 ${isBookmarked ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-800 hover:text-gray-900'} ${isAnimating ? 'scale-0' : 'scale-100'}`}
            >
              {isBookmarked ? (
                <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              )}
            </button>
          </div>

          {/* Publication Information */}
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Author</p>
              <p className="text-gray-800 text-lg">{publication.author}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Co-author</p>
              <p className="text-gray-800 text-lg">{publication.coauthor || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Upload Date</p>
              <p className="text-gray-800 text-lg">{formatDate(publication.uploadDate)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Category</p>
              <p className="text-gray-800 text-lg">{publication.category.charAt(0).toUpperCase() + publication.category.slice(1)}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap wrap-break-word overflow-wrap-break-word">{publication.description}</p>
          </div>

          {/* Publication File Preview */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Publication File</h2>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="13 2 13 9 20 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-gray-600 font-medium mb-2">Publication File</p>
              <p className="text-gray-500 text-sm mb-4">PDF document</p>
              <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300">
                Download File
              </button>
            </div>
          </div>

          {/* Proof File Preview */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Proof File</h2>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="13 2 13 9 20 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-gray-600 font-medium mb-2">Proof File</p>
              <p className="text-gray-500 text-sm mb-4">PDF document</p>
              <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300">
                Download File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicationPage;
