import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

// Create the context
const UserContext = createContext();

// Create the provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        return;
      }

      // If no profile found, just set minimal user info
      if (!data || data.length === 0) {
        console.log('No profile found for user:', userId);
        setLoading(false);
        return;
      }

      const userProfile = data[0];

      // Format user data to match existing structure
      setUser({
        userID: userProfile.email,
        role: userProfile.role,
        faculty: userProfile.faculty,
        fullName: userProfile.full_name || userProfile.email,
        id: userProfile.id,
        isActive: userProfile.is_active,
        title: userProfile.title,
        phone: userProfile.phone,
        scholarLink: userProfile.scholar_link,
        bio: userProfile.bio,
        isAdmin: userProfile.role === 'admin',
        isCoordinator: userProfile.role === 'coordinator'
      });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading }}>
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
