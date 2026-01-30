import { useState } from "react";
import NavigationSidebar from "./components/NavigationSidebar";
import UserDropdown from "./components/UserDropdown";
import SearchBar from "./components/SearchBar";
import PublicationCard from "./components/PublicationCard";
import { useUser } from "./context/UserContext";
import { publications } from "./data/publications";

function UserPublication() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showHideModal, setShowHideModal] = useState(false);
  const { user } = useUser();

  // Get publications where current user is author or coauthor from global publications list
  // Admins see everything, regular users see only verified and not hidden
  const userPublications = publications.filter(pub => 
    (pub.author === user.name || pub.coauthor === user.name) && 
    (user.role === "admin" ? true : (!pub.hidden && pub.status === "verified"))
  );

  // Further filter by search with improved logic
  const filteredPublications = searchValue.trim() === ''
    ? userPublications
    : userPublications.filter(pub => {
        const searchLower = searchValue.toLowerCase().trim();
        
        // Direct matches
        const titleMatch = pub.title.toLowerCase().includes(searchLower);
        const descriptionMatch = pub.description.toLowerCase().includes(searchLower);
        
        if (titleMatch || descriptionMatch) {
          return true;
        }
        
        // Keyword-based matching
        const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
        const descriptionLower = pub.description.toLowerCase();
        const titleLower = pub.title.toLowerCase();
        
        return searchWords.some(word => 
          (descriptionLower.includes(word) && word.length >= 2) || 
          (titleLower.includes(word) && word.length >= 2)
        );
      });

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

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
                author={pub.author}
                coauthor={pub.coauthor}
                uploadDate={formatDate(pub.uploadDate)}
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

