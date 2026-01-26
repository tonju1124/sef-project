import { useNavigate } from 'react-router-dom';

function UserDropdown({ navOpen, userOpen, setUserOpen }) {
  const navigate = useNavigate();

  const userMenuItems = [
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/login" }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setUserOpen(false);
  };

  return (
    <>
      {/* User Profile Button */}
      <button
        onClick={() => setUserOpen(!userOpen)}
        className={`fixed top-4 right-4 z-45 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors ${navOpen ? 'blur-xs' : ''}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        <span className="text-sm font-medium">John Doe</span>
        <svg className={`w-4 h-4 transition-transform ${userOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {/* User Dropdown Menu */}
      <div
        className={`fixed top-16 right-4 z-50 bg-white border border-gray-300 rounded shadow-lg w-40 transition-all duration-300 ${
          userOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        } ${navOpen ? 'blur-xs' : ''}`}
      >
        <ul className="py-2">
          {userMenuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleMenuClick(item.path)}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay (no blur) */}
      {userOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setUserOpen(false)}
        />
      )}
    </>
  );
}

export default UserDropdown;
