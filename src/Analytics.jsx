import { useState, useEffect } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import CategoryCard from './components/analytics/CategoryCard';
import SearchBar from './components/SearchBar';
import { useUser } from './context/UserContext';
import { supabase } from './config/supabaseClient';

/**
 * Analytics Component
 * Displays analytics and statistics about the user's publications.
 * Groups publications by category and provides search filtering.
 **/

function Analytics() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
      // Only show verified publications, never pending or rejected
      const { data, error: fetchError } = await supabase
        .from('publications')
        .select('id, title, publication_type, status, is_hidden')
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

  // Group publications by publication_type
  const articlesByCategory = {
    journal: publications.filter(pub => pub.publication_type === 'journal').map(pub => pub.title),
    chapter: publications.filter(pub => pub.publication_type === 'chapter').map(pub => pub.title),
    book: publications.filter(pub => pub.publication_type === 'book').map(pub => pub.title),
    proceeding: publications.filter(pub => pub.publication_type === 'proceeding').map(pub => pub.title),
    article: publications.filter(pub => pub.publication_type === 'article').map(pub => pub.title),
  };

  const categories = Object.keys(articlesByCategory).map(key => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1)
  }));

  /**
   * Toggles the expanded state of a category card
   * Opens the selected category to show publications, or closes it if already open
  **/
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  /**
   * Calculates the total number of publications for the user
   **/
  const getTotalPublications = () => {
    return publications.length;
  };

  const totalPublications = getTotalPublications();

  // Filter categories and articles based on search
  const filteredCategories = searchQuery.trim() === '' 
    ? categories 
    : categories.filter(cat => {
        const matchingArticles = articlesByCategory[cat.id].filter(article =>
          article.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchingArticles.length > 0;
      });

  /**
   * Gets filtered articles for a specific category based on search query
   * Returns all articles if no search query, otherwise filters by title match
   **/

  const getFilteredArticles = (categoryId) => {
    if (searchQuery.trim() === '') {
      return articlesByCategory[categoryId];
    }
    return articlesByCategory[categoryId].filter(article =>
      article.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading analytics...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error loading analytics: {error}</p>
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
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
      
      <div className={`z-20 w-full pr-20 ${navOpen ? 'blur-xs' : ''}`}>
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">My Analytics</h1>

        {/* Search Bar */}
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery}
          placeholder="Search publications..."
        />

        {/* Publication Count Box */}
        <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-gray-50">
          <p className="text-xl font-semibold">Total publications: <span className="text-2xl font-bold">{totalPublications}</span> Publication{totalPublications !== 1 ? 's' : ''}</p>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-3 gap-6 w-full items-start">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat.label}
              count={getFilteredArticles(cat.id).length}
              isExpanded={expandedCategory === cat.id}
              onToggle={() => toggleCategory(cat.id)}
              publications={getFilteredArticles(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;