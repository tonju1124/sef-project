import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import { useUser } from './context/UserContext';
import NotAnAdminError from './components/NotAnAdminError';
import AnnouncementForm from './components/AdminAnnouncement/AnnouncementForm';

/**
 * AdminAnnouncement Component
 * 
 * Admin-only page for creating and managing system-wide announcements.
 * Admins can send notifications to all users about events, updates, and issues.
 */
function AdminAnnouncement() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return <NotAnAdminError />;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
      <div className={`z-20 w-full pr-20 ${navOpen ? 'blur-xs' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">Send Announcement</h1>
        <div className="border-b border-gray-300 w-full mb-6"></div>

        <div className="w-full">
          <p className="text-gray-600 mb-8 text-lg">Send announcements to all active users about events, updates, and issues.</p>
          <AnnouncementForm />
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncement;
