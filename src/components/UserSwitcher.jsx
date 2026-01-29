import { useUser } from '../context/UserContext';

// UserSwitcher component to switch between admin and student users  this will be deleted after demo}

export default function UserSwitcher() {
  const { user, switchUser } = useUser();

  return (
    <div className="fixed bottom-6 right-6 flex gap-2 z-50">
      <button
        onClick={() => switchUser('admin')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          user.role === 'admin'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        Admin
      </button>
      <button
        onClick={() => switchUser('student')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          user.role === 'student'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        Student
      </button>
    </div>
  );
}
