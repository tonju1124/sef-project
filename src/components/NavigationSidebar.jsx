import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function NavigationSidebar({ navOpen, setNavOpen }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const isAdmin = user.isAdmin;
  
  const navItems = [
    { label: "Home", path: "/", icon: "home" },
    { label: "My Project", path: "/user-publication", icon: "project" },
    { label: "Saved", path: "/bookmark", icon: "bookmark" },
    { label: "Notification", path: "/notifications", icon: "notification" },
    { label: "My Analytics", path: "/analytics", icon: "analytics" },
    { label: "Verification Status", path: "/verification", icon: "verification" }
  ];

  const adminItems = [
    { label: "Announcement", path: "/announcement", icon: "announcement" },
    { label: "User Management", path: "/adminusermanagement", section: "users", icon: "users" },
    { label: "Hide Publication", path: "/hiddenpublication", section: "dashboard", icon: "hide" }
  ];

  const getIcon = (iconName) => {
    const icons = {
      home: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
      project: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z"/></svg>,
      bookmark: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
      notification: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>,
      analytics: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4-1h2v19h-2zm4 4h2v15h-2z"/></svg>,
      verification: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M10 15l-3.5-3.5a1 1 0 0 0-1.414 1.414l4.207 4.207a1 1 0 0 0 1.414 0l9.9-9.9a1 1 0 0 0-1.414-1.414L10 15z"/></svg>,
      announcement: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06"/></svg>,
      users: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.89 1.97 1.74 1.97 2.95V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
      hide: <svg className="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0-2C6.48 5 2 8.13 2 12s4.48 7 10 7 10-3.13 10-7-4.48-7-10-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>,
    };
    return icons[iconName] || null;
  };

  const handleNavClick = (path, section) => {
    navigate(path, { state: { activeTab: section } });
    setNavOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setNavOpen(!navOpen)}
        className="fixed top-4 left-4 z-50 p-2 hover:bg-gray-200 rounded shadow-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25m0 0c0 .21.011.42.033.63M2 17.25h20m-20 0c-.012.21-.023.42-.033.63m20-.63v-.75a9.001 9.001 0 00-17.25-6.811c-.088.185-.174.371-.257.557M12 6.253l7.5-3.365"
          />
        </svg>
      </button>

      {/* Navigation Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen w-64 rounded-xl bg-linear-to-b from-gray-100 to-gray-50 border border-gray-300 z-40 transform transition-transform duration-300 ease-in-out shadow-xl ${
          navOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 mt-16">
          <p className="text-lg font-semibold border-t-2 border-b-2 border-nav-border mb-4 py-4 px-2">My Dashboard</p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.path)}
                  className="w-full text-left px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-3 group"
                >
                  <span className="transition-transform group-hover:scale-125">
                    {getIcon(item.icon)}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {isAdmin && (
            <>
              <p className="text-lg font-semibold border-t-2 border-b-2 border-nav-border mb-4 py-4 px-2 mt-6">Admin Panel</p>
              <ul className="space-y-2">
                {adminItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleNavClick(item.path, item.section)}
                      className="w-full text-left px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-3 group"
                    >
                      <span className="transition-transform group-hover:scale-125">
                        {getIcon(item.icon)}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </nav>

      {/* Overlay */}
      {navOpen && (
        <div
          className="fixed inset-0 z-30 cursor-pointer"
          onClick={() => setNavOpen(false)}
        />
      )}
    </>
  );
}

export default NavigationSidebar;
