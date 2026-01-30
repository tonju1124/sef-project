import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import PublicationCard from './components/PublicationCard';
import UploadPublicationButton from './components/MainPage/UploadPublicationButton';
import FilterDropdown from './components/MainPage/FilterDropdown';
import AdminFilterDropdown from './components/MainPage/AdminFilterDropdown';
import { publications } from './data/publications';
import SearchBar from './components/SearchBar';
import { useUser } from './context/UserContext';

function MainPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortPos, setSortPos] = useState({ top: 0, left: 0 });
  const [adminFilters, setAdminFilters] = useState({
    hidden: 'All',
    status: {
      verified: true,
      pending: true,
      rejected: true
    }
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useUser();

  const sortOptions = ['Newest', 'Oldest', 'Most Popular'];

  const handleHideConfirm = () => {
    // Trigger a re-render to apply filters after publication data changes
    setRefreshKey(prev => prev + 1);
  };

  const handleSortOpen = (pos) => {
    setSortPos(pos);
    setSortOpen(!sortOpen);
  };

  const handleSortSelect = (option) => {
    setSortBy(option);
    setSortOpen(false);
  };

  const handleAdminFilterChange = (filters) => {
    setAdminFilters(filters);
  };

  // Smart search - searches title, author, and description with keyword matching
  // Admins see everything (with admin filters), regular users see only verified and not hidden
  const filteredPublications = searchValue.trim() === ''
    ? publications.filter(pub => {
        // Regular users: only verified and not hidden
        if (user.role !== "admin") {
          return !pub.hidden && pub.status === "verified";
        }
        
        // Admin filters
        const hiddenMatch = adminFilters.hidden === 'All' ? true :
          adminFilters.hidden === 'Hidden' ? pub.hidden :
          adminFilters.hidden === 'Visible' ? !pub.hidden : true;
        
        const statusMatch = adminFilters.status[pub.status];
        
        return hiddenMatch && statusMatch;
      })
    : publications.filter(pub => {
        // Regular users: only verified and not hidden
        if (user.role !== "admin" && (pub.hidden || pub.status !== "verified")) return false;
        
        // Admin filters
        if (user.role === "admin") {
          const hiddenMatch = adminFilters.hidden === 'All' ? true :
            adminFilters.hidden === 'Hidden' ? pub.hidden :
            adminFilters.hidden === 'Visible' ? !pub.hidden : true;
          
          const statusMatch = adminFilters.status[pub.status];
          
          if (!hiddenMatch || !statusMatch) return false;
        }
        
        const searchLower = searchValue.toLowerCase().trim();
        
        // Direct matches
        const titleMatch = pub.title.toLowerCase().includes(searchLower);
        const authorMatch = pub.author.toLowerCase().includes(searchLower);
        const coauthorMatch = pub.coauthor.toLowerCase().includes(searchLower);
        const descriptionMatch = pub.description.toLowerCase().includes(searchLower);
        
        // If any direct match, include it
        if (titleMatch || authorMatch || coauthorMatch || descriptionMatch) {
          return true;
        }
        
        // Keyword-based matching for partial words
        const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
        const descriptionLower = pub.description.toLowerCase();
        const titleLower = pub.title.toLowerCase();
        
        return searchWords.some(word => 
          (descriptionLower.includes(word) && word.length >= 2) || 
          (titleLower.includes(word) && word.length >= 2)
        );
      });

  // Sort publications based on sortBy
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'Oldest':
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      case 'Most Popular':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown
        navOpen={navOpen}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
      />
      <div className={`z-20 w-full pr-20 ${navOpen ? "blur-xs" : ""}`}>
        <h1 className="text-3xl font-bold mb-4">Home</h1>
        <div className="border-b border-gray-300 w-full mb-4"></div>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search your publications..."
        />
        <div className="flex items-center justify-between mt-6 px-0">
          <div className="flex items-center gap-4">
            <FilterDropdown
              label="Sort By"
              value={sortBy}
              options={sortOptions}
              isOpen={sortOpen}
              onToggle={handleSortOpen}
              onSelect={handleSortSelect}
              dropdownPos={sortPos}
            />
            {user.role === "admin" && (
              <AdminFilterDropdown onFilterChange={handleAdminFilterChange} />
            )}
          </div>

          {/* Upload publication button */}
          <UploadPublicationButton />
        </div>
        <div className="mt-2">
          {filteredPublications.length > 0 ? (
            sortedPublications.map((pub) => (
              <PublicationCard
                key={pub.id}
                id={pub.id}
                title={pub.title}
                author={pub.author}
                coauthor={pub.coauthor}
                uploadDate={pub.uploadDate}
                description={pub.description}
                bookmarked={pub.bookmarked}
                onHideConfirm={handleHideConfirm}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No publications found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
