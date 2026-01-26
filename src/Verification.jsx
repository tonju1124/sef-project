import { useState } from "react";
import NavigationSidebar from "./components/NavigationSidebar";
import UserDropdown from "./components/UserDropdown";
import UserVerification from "./components/UserVerification/UserVerificationList";

function Verification() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown
        navOpen={navOpen}
        userOpen={userOpen}
        setUserOpen={setUserOpen}
      />
      <div className={`z-20 w-full pr-20 ${navOpen ? "blur-xs" : ""}`}>
        <h1 className="text-3xl font-bold mb-4">My Publication Verification </h1>
        <div className="border-b border-gray-300 w-full mb-6"></div>
        <UserVerification />
      </div>
    </div>
  );
}
export default Verification;
