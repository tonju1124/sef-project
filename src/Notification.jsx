import { useState, useEffect } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import NotificationCard from './components/Notification/NotificationCard';
import { useUser } from './context/UserContext';
import { supabase } from './config/supabaseClient';

/**
 * Notification Component
 * 
 * Displays a list of notifications for the current user.
 * Shows messages about publication status, system updates, and other relevant alerts.
 */
function Notification() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, [user?.id]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      console.log('Fetching notifications for user:', user.id);
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      console.log('Notifications fetch response:', { data, error });

      if (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
        return;
      }

      console.log('Notifications loaded:', data?.length || 0, 'items');
      setNotifications(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        return;
      }

      // Update local state
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const formatNotificationTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
      <div className={`z-20 w-full pr-20 ${navOpen ? 'blur-xs' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">Notifications</h1>
        <div className="border-b border-gray-300 w-full mb-4"></div>
        
        {/* Notification Items */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          </div>
        ) : notifications.length > 0 ? (
          <div className="mt-4 w-full items-start text-left space-y-4">
            {notifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                id={notif.id}
                title={notif.title || 'Publication Reviewing'}
                timestamp={formatNotificationTime(notif.created_at)}
                description={notif.message || notif.description}
                isRead={notif.is_read}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Notification;