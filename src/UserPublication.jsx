import { useState, useEffect } from "react";
import NavigationSidebar from "./components/NavigationSidebar";
import UserDropdown from "./components/UserDropdown";
import SearchBar from "./components/SearchBar";
import PublicationCard from "./components/PublicationCard";
import { useUser } from "./context/UserContext";
import { supabase } from "./config/supabaseClient";

/**
 * UserPublication Component
 * 
 * Displays all verified and not hidden publications where the current user is the author.
 * Includes search functionality to filter user's publications.
 */
function UserPublication() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showHideModal, setShowHideModal] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      fetchPublications();
    }
  }, [user?.id]);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      // Only show verified and not hidden publications
      const { data, error: fetchError } = await supabase
        .from('publications')
        .select('id, title, co_authors, description, created_at, author_id')
        .eq('author_id', user.id)
        .eq('status', 'verified')
        .eq('is_hidden', false)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setPublications(data || []);
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Further filter by search with improved logic
  const filteredPublications = searchValue.trim() === ''
    ? publications
    : publications.filter(pub => {
        const searchLower = searchValue.toLowerCase().trim();
        
        // Direct matches
        const titleMatch = pub.title.toLowerCase().includes(searchLower);
        const descriptionMatch = pub.description?.toLowerCase().includes(searchLower) || false;
        
        if (titleMatch || descriptionMatch) {
          return true;
        }
        
        // Keyword-based matching
        const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
        const descriptionLower = pub.description?.toLowerCase() || '';
        const titleLower = pub.title.toLowerCase();
        
        return searchWords.some(word => 
          (descriptionLower.includes(word) && word.length >= 2) || 
          (titleLower.includes(word) && word.length >= 2)
        );
      });

  /**
   * Formats a date string from YYYY-MM-DDTHH:MM:SS to DD/MM/YYYY format
   * 
   * @param {string} dateString - Date in ISO format
   * @returns {string} Formatted date in DD/MM/YYYY format
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading your publications...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error loading publications: {error}</p>
          <button
            onClick={() => fetchPublications()}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      {!showHideModal && <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />}
      {!showHideModal && <UserDropdown
        navOpen={navOpen}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
      />}
      <div className={`z-20 w-full pr-20 ${navOpen ? "blur-xs" : ""}`}>
        <h1 className="text-3xl font-bold mb-4">My Publication</h1>
        <div className="border-b-2 border-gray-300 w-full mb-6"></div>
        
        {/* Search Bar */}
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search your publications..."
        />

        {/* Publications List */}
        <div className="mt-6">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <PublicationCard
                key={pub.id}
                id={pub.id}
                title={pub.title}
                author={user?.fullName || user?.email}
                coauthor={pub.co_authors}
                uploadDate={formatDate(pub.created_at)}
                description={pub.description}
                onModalStateChange={setShowHideModal}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">No Publication</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserPublication;

