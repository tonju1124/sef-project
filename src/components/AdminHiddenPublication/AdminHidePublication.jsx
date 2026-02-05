import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
import PublicationCard from '../PublicationCard';
import HideConfirmation from './HideConfirmation';
import { supabase } from '../../config/supabaseClient';

/**
 * AdminHidePublication Component
 * 
 * Page for managing hidden publications.
 * Displays all hidden publications with ability to restore them using fade animation.
 * Includes search functionality to filter hidden publications.
 */
function AdminHidePublication() {
  const [showHideModal, setShowHideModal] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadingPublications, setFadingPublications] = useState(new Set());
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHiddenPublications();
  }, []);

  /**
   * Fetch all hidden publications from the database
   */
  const fetchHiddenPublications = async () => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*, profiles(full_name, email)')
        .eq('is_hidden', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching hidden publications:', error);
        setLoading(false);
        return;
      }

      // Format the data to match the component's expected structure
      const formattedData = data.map(pub => ({
        id: pub.id,
        title: pub.title,
        author: pub.profiles?.full_name || pub.profiles?.email || 'Unknown',
        coauthor: pub.co_authors || '',
        uploadDate: pub.created_at,
        description: pub.description,
        category: pub.publication_type
      }));

      setPublications(formattedData);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter hidden publications and apply search query.
   */
  const filteredPublications = publications.filter(pub => {
    const query = searchQuery.toLowerCase();
    return (
      pub.title.toLowerCase().includes(query) ||
      pub.author.toLowerCase().includes(query) ||
      pub.coauthor.toLowerCase().includes(query)
    );
  });

  /**
   * Handles publication restore action.
   * Updates is_hidden status in database and applies fade out animation before removal.
   */
  const handleRestore = async (publicationId, publicationTitle) => {
    // Start fade out animation
    setFadingPublications(prev => new Set(prev).add(publicationId));
    
    try {
      const { error } = await supabase
        .from('publications')
        .update({ is_hidden: false })
        .eq('id', publicationId);

      if (error) {
        console.error('Error restoring publication:', error);
        setFadingPublications(prev => {
          const next = new Set(prev);
          next.delete(publicationId);
          return next;
        });
        return;
      }

      console.log('Publication restored:', publicationTitle);
      
      // Remove from list after animation completes (300ms)
      setTimeout(() => {
        setPublications(prev => prev.filter(p => p.id !== publicationId));
        setFadingPublications(prev => {
          const next = new Set(prev);
          next.delete(publicationId);
          return next;
        });
      }, 300);
    } catch (err) {
      console.error('Error:', err);
      setFadingPublications(prev => {
        const next = new Set(prev);
        next.delete(publicationId);
        return next;
      });
    }
  };

  /**
   * Handles hide confirmation.
   * This shouldn't be needed on this page but kept for consistency.
   */
  const handleHideConfirm = () => {
    setShowHideModal(false);
    setSelectedPublicationId(null);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading hidden publications...</h2>
        </div>
      </div>
    );
  }

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
        {filteredPublications.length > 0 ? (
          filteredPublications.map((publication) => (
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
