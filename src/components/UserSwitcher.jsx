import { useUser } from '../context/UserContext';

/**
 * UserSwitcher Component
 * 
 * Development utility component for switching between different user roles.
 * Allows testing different features based on user role (admin, student, lecturer, coordinator).
 * 
 * NOTE: This component is intended for development/demo purposes and should be removed before production.
 */
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
      <button
        onClick={() => switchUser('lecturer')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          user.role === 'lecturer'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        Lecturer
      </button>
      <button
        onClick={() => switchUser('coordinator')}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          user.role === 'coordinator'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
      >
        Coordinator
      </button>
    </div>
  );
}
