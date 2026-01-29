import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import CategoryCard from './components/analytics/CategoryCard';
import SearchBar from './components/SearchBar';
import { useUser } from './context/UserContext';

function Analytics() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();

  const articlesByCategory = user.analytics;
  const categories = Object.keys(articlesByCategory).map(key => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1)
  }));

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getTotalPublications = () => {
    return Object.values(articlesByCategory).reduce((total, articles) => total + articles.length, 0);
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
          <p className="text-xl font-semibold">Number of publications uploaded this month: <span className="text-2xl font-bold">{totalPublications}</span> Publication{totalPublications !== 1 ? 's' : ''}</p>
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