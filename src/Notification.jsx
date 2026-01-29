import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import NotificationCard from './components/Notification/NotificationCard';
import { useUser } from './context/UserContext';

function Notification() {

      const [navOpen, setNavOpen] = useState(false);
      const [userOpen, setUserOpen] = useState(false);
      const { user } = useUser();

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
            <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
            <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
            <div className={`z-20 w-full pr-20 ${navOpen ? 'blur-xs' : ''}`}>
                <h1 className="text-3xl font-bold mb-4">Notifications</h1>
                <div className="border-b border-gray-300 w-full mb-4"></div>
                
                {/* Notification Items */}
                <div className="mt-4 w-full items-start text-left space-y-4">
                  {user.notifications.map((notif) => (
                    <NotificationCard
                      key={notif.id}
                      title={notif.message}
                      timestamp={notif.date}
                      description={notif.message}
                    />
                  ))}
                </div>
            </div>
        </div>
    );
}
export default Notification;