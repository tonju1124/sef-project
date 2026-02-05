import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import DeactiveConfirmation from './DeactiveConfirmation';

function AdminUserManagementBox({ showDeactiveModal, setShowDeactiveModal, searchQuery = '', typeFilter = 'All', showActive = true, showDeactivated = true }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, is_active')
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      user.id.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchLower))
    );
    
    // Map user role to type display (capitalize first letter)
    const userType = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    const matchesType = typeFilter === 'All' || userType === typeFilter;
    
    // Filter by active/deactivated status
    const matchesStatus = (user.is_active && showActive) || (!user.is_active && showDeactivated);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleToggleStatus = async (userId) => {
    const user = users.find(u => u.id === userId);
    const currentStatus = user.is_active;
    
    if (currentStatus) {
      // Show confirmation when trying to deactivate
      setSelectedUser(userId);
      setShowDeactiveModal(true);
    } else {
      // Directly reactivate without confirmation
      await updateUserStatus(userId, true);
    }
  };

  const updateUserStatus = async (userId, isActive) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: isActive })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user status:', error);
        return;
      }

      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId ? { ...u, is_active: isActive } : u
        )
      );
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const confirmDeactivate = async () => {
    await updateUserStatus(selectedUser, false);
    setShowDeactiveModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading users...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">{user.full_name || user.email || '-'}</p>
                    <p className="text-gray-500 underline">{user.email}</p>
                    <p className="text-gray-600 text-sm">Type: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`px-6 py-2 rounded font-semibold transition-all duration-500 transform animate-buttonFlip ${
                      user.is_active
                        ? 'bg-green-200 text-green-800 hover:bg-green-300 hover:scale-105'
                        : 'bg-red-200 text-red-800 hover:bg-red-300 hover:scale-105'
                    } active:scale-95`}
                  >
                    {user.is_active ? 'Active' : 'Deactivated'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-500 text-lg">No users found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      )}

      {showDeactiveModal && selectedUser && (
        <DeactiveConfirmation
          userId={selectedUser}
          userEmail={users.find(u => u.id === selectedUser)?.email}
          onConfirm={confirmDeactivate}
          onCancel={() => setShowDeactiveModal(false)}
        />
      )}
    </div>
  );
}

export default AdminUserManagementBox;