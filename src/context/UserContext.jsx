import React, { createContext, useState, useContext } from 'react';
import { adminUser, studentUser } from '../data/UserData';

// Create the context
const UserContext = createContext();

// Create the provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(studentUser);

  const switchUser = (role) => {
    if (role === 'admin') {
      setUser(adminUser);
    } else if (role === 'student') {
      setUser(studentUser);
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
