import { useState } from "react";
import NavigationSidebar from "./components/NavigationSidebar";
import UserDropdown from "./components/UserDropdown";
import SearchBar from "./components/SearchBar";
import PublicationCard from "./components/PublicationCard";
import { publications } from "./data/publications";

function UserPublication() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // For demo purposes, assume current user is "John Doe"
  // In a real app, this would come from user context/auth
  const currentUser = "John Doe";

  // Filter publications by current user
  const userPublications = publications.filter(pub => pub.author === currentUser);

  // Further filter by search
  const filteredPublications = searchValue.trim() === ''
    ? userPublications
    : userPublications.filter(pub =>
        pub.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchValue.toLowerCase())
      );

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown
        navOpen={navOpen}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
      />
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
                title={pub.title}
                author={pub.author}
                coauthor={pub.coauthor}
                uploadDate={formatDate(pub.uploadDate)}
                description={pub.description}
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

