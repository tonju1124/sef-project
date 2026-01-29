import { useState, useEffect } from 'react';
import { adminUser, studentUser, lecturerUser, coordinatorUser } from '../../data/UserData';
import DeactiveConfirmation from './DeactiveConfirmation';

function AdminUserManagementBox({ showDeactiveModal, setShowDeactiveModal, searchQuery = '', typeFilter = 'All' }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStatus, setUserStatus] = useState({});

  useEffect(() => {
    // Combine all users
    const userList = [adminUser, studentUser, lecturerUser, coordinatorUser];
    setUsers(userList);
    // Initialize status for each user as active
    const initialStatus = {};
    userList.forEach(user => {
      initialStatus[user.id] = 'active';
    });
    setUserStatus(initialStatus);
  }, []);

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      user.id.toString().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
    
    // Map user role to type display (capitalize first letter)
    const userType = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    const matchesType = typeFilter === 'All' || userType === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleToggleStatus = (userId) => {
    const currentStatus = userStatus[userId];
    if (currentStatus === 'active') {
      // Show confirmation when trying to deactivate
      setSelectedUser(userId);
      setShowDeactiveModal(true);
    } else {
      // Directly reactivate without confirmation
      setUserStatus(prev => ({
        ...prev,
        [userId]: 'active'
      }));
    }
  };

  const confirmDeactivate = () => {
    // Deactivate the user after confirmation
    setUserStatus(prev => ({
      ...prev,
      [selectedUser]: 'deactivate'
    }));
    setShowDeactiveModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
          <div key={user.id} className="border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-gray-600">{user.id}</p>
                <p className="text-gray-500 underline">{user.email}</p>
                <p className="text-gray-600 text-sm">Type: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
              </div>
              <button
                onClick={() => handleToggleStatus(user.id)}
                key={`${user.id}-${userStatus[user.id]}`}
                className={`px-6 py-2 rounded font-semibold transition-all duration-500 transform animate-buttonFlip ${
                  userStatus[user.id] === 'active'
                    ? 'bg-green-200 text-green-800 hover:bg-green-300 hover:scale-105'
                    : 'bg-red-200 text-red-800 hover:bg-red-300 hover:scale-105'
                } active:scale-95`}
              >
                {userStatus[user.id] === 'active' ? 'Active' : 'Deactivate'}
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

      {showDeactiveModal && (
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