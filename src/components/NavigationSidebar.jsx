import { useNavigate } from 'react-router-dom';

function NavigationSidebar({ navOpen, setNavOpen }) {
  const navigate = useNavigate();
  
  const navItems = [
    { label: "Home", path: "/" },
    { label: "My Project", path: "/user-publication" },
    { label: "Saved", path: "/saved" },
    { label: "Notification", path: "/notifications" },
    { label: "My Analytics", path: "/analytics" },
    { label: "Verification Status", path: "/verification" }
  ];

  const handleNavClick = (path) => {
    navigate(path);
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
        className={`fixed left-0 top-0 h-screen w-64 rounded-xl bg-gray-100 border border-gray-300 z-40 transform transition-transform duration-300 ease-in-out shadow-xl ${
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
                  className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-10"
          onClick={() => setNavOpen(false)}
        />
      )}
    </>
  );
}

export default NavigationSidebar;
