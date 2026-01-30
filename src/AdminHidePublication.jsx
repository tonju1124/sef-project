import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import AdminHidePublication from './components/AdminHiddenPublication/AdminHidePublication';
import { useUser } from './context/UserContext';
import NotAnAdminError from './components/NotAnAdminError';

function HiddenPublication() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { user } = useUser();

  if (!user.isAdmin) {
    return <NotAnAdminError />;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
      <div className={`z-20 w-full pr-20 ${navOpen ? 'blur-xs' : ''}`}>
        <AdminHidePublication />
      </div>
    </div>
  );
}

export default HiddenPublication;
