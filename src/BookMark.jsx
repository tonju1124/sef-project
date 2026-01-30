import { useState, useEffect } from "react";
import NavigationSidebar from "./components/NavigationSidebar";
import UserDropdown from "./components/UserDropdown";
import SearchBar from "./components/SearchBar";
import PublicationCard from "./components/PublicationCard";
import { useUser } from "./context/UserContext";
import { publications } from "./data/publications";

function Bookmark() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user } = useUser();

  const filteredPublications = publications
    .filter((publication) => user.bookmarks.includes(publication.id) && 
      (user.role === "admin" ? true : (!publication.hidden && publication.status === "verified"))
    )
    .filter((publication) =>
      publication.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      publication.author.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown
        navOpen={navOpen}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
      />
      <div className={`z-20 w-full pr-20 ${navOpen ? "blur-xs" : ""}`}>
        <h1 className="text-3xl font-bold mb-4">Bookmarks</h1>
        <div className="border-b border-gray-300 w-full mb-4"></div>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search bookmarks..."
        />
        <div className="mt-6">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((publication) => (
              <PublicationCard
                key={publication.id}
                id={publication.id}
                title={publication.title}
                author={publication.author}
                coauthor={publication.coauthor}
                uploadDate={publication.uploadDate}
                description={publication.description}
                bookmarked={publication.bookmarked}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No bookmarks found</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Bookmark;