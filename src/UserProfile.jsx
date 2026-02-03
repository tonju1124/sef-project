import { useState } from "react";
import NavigationSidebar from "./components/NavigationSidebar";
import UserDropdown from "./components/UserDropdown";
import UserProfileCard from "./components/UserProfile/UserProfileCard";

/**
 * UserProfile Component
 * 
 * Page displaying the current user's profile information.
 * Allows users to view and edit their personal details.
 */
function UserProfile() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
      
      <div className={`z-20 w-full pr-20 ${navOpen ? "blur-xs" : ""}`}>
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="border-b border-gray-300 w-full mb-8"></div>

        <UserProfileCard />
      </div>
    </div>
  );
}

export default UserProfile;
