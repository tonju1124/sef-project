import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import PublicationCard from './components/PublicationCard';
import UploadPublicationButton from './components/MainPage/UploadPublicationButton';
import FilterDropdown from './components/MainPage/FilterDropdown';
import { publications } from './data/publications';

function MainPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [timeFilter, setTimeFilter] = useState('All time');
  const [sortBy, setSortBy] = useState('Sort By');
  const [timeOpen, setTimeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [timePos, setTimePos] = useState({ top: 0, left: 0 });
  const [sortPos, setSortPos] = useState({ top: 0, left: 0 });

  const timeOptions = ['All time', 'Last week', 'Last month', 'Last year'];
  const sortOptions = ['Sort By', 'Newest', 'Oldest', 'Most Popular'];

  const handleTimeOpen = (pos) => {
    setTimePos(pos);
    setTimeOpen(!timeOpen);
  };

  const handleSortOpen = (pos) => {
    setSortPos(pos);
    setSortOpen(!sortOpen);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center relative select-none">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />

      <div className={`fixed inset-0 z-20 flex px-20 py-16 justify-center pointer-events-none overflow-y-auto pb-4 ${navOpen ? 'blur-xs' : ''}`}>
        <div className="text-center pointer-events-auto w-full px-6 pr-20">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:bg-gray-100 focus:border-gray-100 focus:shadow-sm hover:bg-gray-100 hover:border-gray-100 hover:shadow-sm transition-colors duration-300"
            />
            <button
              onClick={() => setSearchValue('')}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Filter System */}
          <div className="flex items-center justify-between mt-6 px-0">
            <div className="flex items-center gap-4">
              <FilterDropdown
                label="All time"
                value={timeFilter}
                options={timeOptions}
                isOpen={timeOpen}
                onToggle={handleTimeOpen}
                onSelect={setTimeFilter}
                dropdownPos={timePos}
              />
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
            {publications.map((pub) => (
              <PublicationCard
                key={pub.id}
                title={pub.title}
                author={pub.author}
                coauthor={pub.coauthor}
                uploadDate={pub.uploadDate}
                description={pub.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
