import { useState } from 'react';
import SearchBar from '../SearchBar';
import PublicationCard from '../PublicationCard';
import HideConfirmation from './HideConfirmation';
import { publications } from '../../data/publications';

function AdminHidePublication() {
  const [showHideModal, setShowHideModal] = useState(false);
  const [restoredPublications, setRestoredPublications] = useState(new Set());
  const [fadingPublications, setFadingPublications] = useState(new Set());
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all hidden publications (excluding restored ones)
  const hiddenPublications = publications.filter(pub => {
    if (pub.hidden && !restoredPublications.has(pub.id)) {
      // Filter by search query
      const query = searchQuery.toLowerCase();
      return (
        pub.title.toLowerCase().includes(query) ||
        pub.author.toLowerCase().includes(query) ||
        pub.coauthor.toLowerCase().includes(query)
      );
    }
    return false;
  });

  const handleRestore = (publicationId, publicationTitle) => {
    // Start fade out animation
    setFadingPublications(prev => new Set(prev).add(publicationId));
    
    // Remove from list after animation completes (300ms)
    setTimeout(() => {
      setRestoredPublications(prev => new Set(prev).add(publicationId));
      setFadingPublications(prev => {
        const next = new Set(prev);
        next.delete(publicationId);
        return next;
      });
      
      // Update the publication's hidden status to false
      const pub = publications.find(p => p.id === publicationId);
      if (pub) {
        pub.hidden = false;
      }
    }, 300);
    
    console.log('Publication restored:', publicationTitle);
  };

  const handleHideConfirm = () => {
    if (selectedPublicationId) {
      // Get the publication and update hidden status immediately
      const pub = publications.find(p => p.id === selectedPublicationId);
      if (pub) {
        pub.hidden = true;
        console.log('Publication hidden:', pub.title);
      }
      
      // Start fade out animation
      setFadingPublications(prev => new Set(prev).add(selectedPublicationId));
      
      // Remove from list after animation completes (300ms)
      setTimeout(() => {
        // Mark as hidden by adding to restoredPublications (removes from hidden list)
        setRestoredPublications(prev => new Set(prev).add(selectedPublicationId));
        setFadingPublications(prev => {
          const next = new Set(prev);
          next.delete(selectedPublicationId);
          return next;
        });
      }, 300);
    }
    
    setShowHideModal(false);
    setSelectedPublicationId(null);
  };

  return (
    <div className="w-full">
      {showHideModal && (
        <HideConfirmation 
          publicationTitle={publications.find(p => p.id === selectedPublicationId)?.title || ""}
          onConfirm={handleHideConfirm}
          onCancel={() => {
            setShowHideModal(false);
            setSelectedPublicationId(null);
          }}
        />
      )}
      
      <h1 className="text-3xl font-bold mb-4">Hidden Publications</h1>
      <div className="border-b border-gray-300 w-full"></div>
      <div className="mt-2">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, author, or coauthor..."
        />
      </div>
      
      {/* Display all hidden publications */}
      <div>
        {hiddenPublications.length > 0 ? (
          hiddenPublications.map((publication) => (
            <div 
              key={publication.id}
              className={`transition-opacity duration-300 ${fadingPublications.has(publication.id) ? 'opacity-0' : 'opacity-100'}`}
            >
              <PublicationCard 
                id={publication.id}
                title={publication.title}
                author={publication.author}
                coauthor={publication.coauthor}
                uploadDate={publication.uploadDate}
                description={publication.description}
                bookmarked={publication.bookmarked}
                hideBookmarkBtn={true}
                hideDropdownBtn={true}
                showRestoreBtn={true}
                onRestore={() => handleRestore(publication.id, publication.title)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No hidden publications</p>
        )}
      </div>
    </div>
  );
}

export default AdminHidePublication;
