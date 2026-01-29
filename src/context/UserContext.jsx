import React, { createContext, useState, useContext } from 'react';
import { adminUser, studentUser, lecturerUser, coordinatorUser } from '../data/UserData';

// Create the context
const UserContext = createContext();

// Create the provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(adminUser);

  const switchUser = (role) => {
    if (role === 'admin') {
      setUser(adminUser);
    } else if (role === 'student') {
      setUser(studentUser);
    } else if (role === 'lecturer') {
      setUser(lecturerUser);
    } else if (role === 'coordinator') {
      setUser(coordinatorUser);
    }
  };

  return (
    <UserContext.Provider value={{ user, switchUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
