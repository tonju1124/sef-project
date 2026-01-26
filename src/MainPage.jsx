import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import PublicationCard from './components/PublicationCard';
import UploadPublicationButton from './components/MainPage/UploadPublicationButton';
import FilterDropdown from './components/MainPage/FilterDropdown';
import { publications } from './data/publications';
import SearchBar from './components/SearchBar';

function MainPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortPos, setSortPos] = useState({ top: 0, left: 0 });

  const sortOptions = ['Newest', 'Oldest', 'Most Popular'];

  const handleSortOpen = (pos) => {
    setSortPos(pos);
    setSortOpen(!sortOpen);
  };

  // Smart search - searches title, author, and description with keyword matching
  const filteredPublications = searchValue.trim() === ''
    ? publications
    : publications.filter(pub => {
        const searchLower = searchValue.toLowerCase();
        const titleMatch = pub.title.toLowerCase().includes(searchLower);
        const authorMatch = pub.author.toLowerCase().includes(searchLower);
        const descriptionMatch = pub.description.toLowerCase().includes(searchLower);
        
        // Extract keywords from search and description for better matching
        const searchKeywords = searchLower.split(/\s+/);
        const descriptionKeywords = pub.description.toLowerCase().split(/\s+/);
        const keywordMatches = searchKeywords.some(keyword =>
          descriptionKeywords.some(descKeyword => descKeyword.includes(keyword) && keyword.length > 2)
        );
        
        return titleMatch || authorMatch || descriptionMatch || keywordMatches;
      });

  // Sort publications based on sortBy
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'Oldest':
        return new Date(a.uploadDate) - new Date(b.uploadDate);
      case 'Most Popular':
        // Assuming 'Most Popular' is based on newest by default, can be updated
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center relative select-none">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />

      <div className={`fixed inset-0 z-20 flex px-20 py-16 justify-center pointer-events-none overflow-y-auto pb-4 ${navOpen ? 'blur-xs' : ''}`}>
        <div className="text-center pointer-events-auto w-full px-6 pr-20">
         <SearchBar 
          value={searchValue} 
          onChange={setSearchValue}
          placeholder="Search publications..."
        />

          {/* Filter System */}
          <div className="flex items-center justify-between mt-6 px-0">
            <div className="flex items-center gap-4">
              <FilterDropdown
                label="Sort By"
                value={sortBy}
                options={sortOptions}
                isOpen={sortOpen}
                onToggle={handleSortOpen}
                onSelect={setSortBy}
                dropdownPos={sortPos}
              />
            </div>

            {/* Upload publication button */}
            <UploadPublicationButton />
          </div>

          {/* Publications List */}
          <div className="mt-4 w-full items-start text-left">
            {sortedPublications.map((pub) => (
              <PublicationCard
                key={pub.id}
                title={pub.title}
                author={pub.author}
                coauthor={pub.coauthor}
                uploadDate={pub.uploadDate}
                description={pub.description}
              />
            ))}
            {filteredPublications.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No publications found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
