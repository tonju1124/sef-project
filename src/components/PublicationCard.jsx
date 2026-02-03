import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import HideConfirmation from './AdminHiddenPublication/HideConfirmation';
import { publications } from '../data/publications';

/**
 * PublicationCard Component
 * 
 * Displays a single publication in a card/list format.
 * Shows publication details (title, authors, date, description) and provides admin controls.
 */
function PublicationCard({ id, title, author, coauthor, uploadDate, description, onModalStateChange, hideDropdownBtn = false, showRestoreBtn = false, onRestore, onHideConfirm }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleHidePublication = () => {
    setShowHideModal(true);
    setShowDropdown(false);
    onModalStateChange?.(true);
  };

  const confirmHidePublication = () => {
    setShowHideModal(false);
    onModalStateChange?.(false);
    
    setIsHiding(true);
    
    if (id) {
      const pub = publications.find(p => p.id === id);
      if (pub) {
        pub.hidden = true;
        console.log('Publication hidden:', pub.title);
      }
    }
    
    setTimeout(() => {
      onHideConfirm?.();
    }, 500);
  };

  const cancelHidePublication = () => {
    setShowHideModal(false);
    onModalStateChange?.(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      {showHideModal && (
        <HideConfirmation 
          publicationTitle={title}
          onConfirm={confirmHidePublication}
          onCancel={cancelHidePublication}
        />
      )}
      <div 
        className={`transition-opacity duration-500 ${isHiding ? 'opacity-0' : 'opacity-100'} border-b border-gray-300 py-6 px-0 cursor-pointer hover:bg-gray-50 group`}
        onClick={() => navigate(`/publication/${id}`)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 group-hover:text-gray-900 transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium text-gray-700">Author:</span> {author}</p>
              <p><span className="font-medium text-gray-700">Coauthor:</span> {coauthor}</p>
              <p><span className="font-medium text-gray-700">Upload Date:</span> {uploadDate}</p>
              <p className="line-clamp-1"><span className="font-medium text-gray-700">Publication Description:</span> {description}</p>
            </div>
          </div>
          {showRestoreBtn && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRestore();
              }}
              className="bg-black hover:bg-gray-800 text-white font-medium mt-10 mr-6 py-2 px-5 rounded transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Restore
            </button>
          )}
          <div className="flex items-start gap-2 relative shrink-0">
            {!hideDropdownBtn && user.isAdmin && (
              <div ref={dropdownRef} className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50 animate-fadeIn">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHidePublication();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 hover:text-gray-900 rounded"
                    >
                      Hide this publication
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicationCard;
