import { useState } from 'react';
import { supabase } from '../../config/supabaseClient';

/**
 * AnnouncementForm Component
 * 
 * Form for admins to create and send announcements to all active users.
 * Handles validation, error handling, and success feedback.
 */
function AnnouncementForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSendAnnouncement = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!title.trim()) {
      setError('Announcement title is required');
      return;
    }
    if (!message.trim()) {
      setError('Announcement message is required');
      return;
    }

    setIsLoading(true);
    try {
      // Get all users
      const { data: allUsers, error: usersError } = await supabase
        .from('profiles')
        .select('id')
        .eq('is_active', true);

      if (usersError) {
        throw new Error('Failed to fetch users');
      }

      if (!allUsers || allUsers.length === 0) {
        throw new Error('No active users found');
      }

      // Create notification for each user
      const notifications = allUsers.map(userRecord => ({
        user_id: userRecord.id,
        title: title.trim(),
        message: message.trim(),
        is_read: false
      }));

      const { error: insertError } = await supabase
        .from('notifications')
        .insert(notifications);

      if (insertError) {
        throw new Error(`Failed to send announcement: ${insertError.message}`);
      }

      console.log(`Announcement sent to ${allUsers.length} users`);
      setSuccess(true);
      setTitle('');
      setMessage('');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error sending announcement:', err);
      setError(err.message || 'Failed to send announcement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSendAnnouncement} className="bg-white border border-gray-300 rounded-lg p-12 shadow-lg w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
          Announcement sent successfully to all users!
        </div>
      )}

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Announcement Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Server Maintenance, Event Update, Important Notice"
          className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Announcement Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter the announcement message..."
          rows="10"
          className="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending to all users...' : 'Send Announcement to All Users'}
      </button>
    </form>
  );
}

export default AnnouncementForm;
