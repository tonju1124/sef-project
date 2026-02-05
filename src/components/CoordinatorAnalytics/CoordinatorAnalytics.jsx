import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import CategoryCard from '../analytics/CategoryCard';
import SearchBar from '../SearchBar';

function CoordinatorAnalytics() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all verified and non-hidden publications from database
  useEffect(() => {
    fetchAllPublications();
  }, []);

  const fetchAllPublications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('status', 'verified')
        .eq('is_hidden', false);

      if (error) {
        console.error('Error fetching publications:', error);
        return;
      }

      setPublications(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group publications by publication_type (or category if you have that field)
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

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

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

  // Get filtered articles for each category
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
      <div className="text-center py-8">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Department Analytics</h1>

      {/* Search Bar */}
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery}
        placeholder="Search publications..."
      />

      {/* Publication Count Box */}
      <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-gray-50">
        <p className="text-xl font-semibold">Total publications in department: <span className="text-2xl font-bold">{totalPublications}</span> Publication{totalPublications !== 1 ? 's' : ''}</p>
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
    </>
  );
}

export default CoordinatorAnalytics;
