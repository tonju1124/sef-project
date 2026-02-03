import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import { useUser } from './context/UserContext';
import NotAnAdminError from './components/NotAnAdminError';
import AdminUserManagementBox from './components/AdminUserManage/AdminUserManageBox';
import TypeFilter from './components/AdminUserManage/TypeFilter';
import SearchBar from './components/SearchBar';

/*
 * AdminUserManagement Component
 * Admin-only page for managing user accounts.
 * Allows admins to view, search, filter, and deactivate user accounts.
 */
function AdminUserManagement() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const { user } = useUser();

  if (!user.isAdmin) {
    return <NotAnAdminError />;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      {!showDeactiveModal && <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />}
      {!showDeactiveModal && <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />}
      <div className={`z-20 w-full pr-20 ${navOpen ? 'blur-sm' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        <div className="border-b border-gray-300 w-full mb-4"></div>
        <div className="w-full mb-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by ID or email..." />
          <TypeFilter value={typeFilter} onChange={setTypeFilter} />
        </div>
        <AdminUserManagementBox showDeactiveModal={showDeactiveModal} setShowDeactiveModal={setShowDeactiveModal} searchQuery={searchQuery} typeFilter={typeFilter} />
      </div>
    </div>
  );
}

export default AdminUserManagement;
