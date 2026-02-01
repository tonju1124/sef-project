import { useState } from 'react';
import CategoryCard from '../analytics/CategoryCard';
import SearchBar from '../SearchBar';
import { publications } from '../../data/publications';

function CoordinatorAnalytics() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allPublications = publications;

  const articlesByCategory = {
    journal: allPublications.filter(pub => pub.category === 'journal').map(pub => pub.title),
    chapter: allPublications.filter(pub => pub.category === 'chapter').map(pub => pub.title),
    book: allPublications.filter(pub => pub.category === 'book').map(pub => pub.title),
    proceeding: allPublications.filter(pub => pub.category === 'proceeding').map(pub => pub.title),
    article: allPublications.filter(pub => pub.category === 'article').map(pub => pub.title),
  };

  const categories = Object.keys(articlesByCategory).map(key => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1)
  }));

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getTotalPublications = () => {
    return allPublications.length;
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
