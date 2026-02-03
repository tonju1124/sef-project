import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import { useUser } from './context/UserContext';
import NotAnAdminError from './components/NotAnAdminError';

/**
 * AdminAnnouncement Component
 * 
 * Admin-only page for creating and managing system-wide announcements.
 * Restricted to users with admin privileges.
 */
function AdminAnnouncement() {
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
        <h1 className="text-3xl font-bold mb-4">Announcement</h1>
        <div className="border-b border-gray-300 w-full mb-4"></div>
        <p className="text-gray-600">Create and manage announcements here.</p>
      </div>
    </div>
  );
}

export default AdminAnnouncement;
