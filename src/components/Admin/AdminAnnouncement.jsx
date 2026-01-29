import React, { useState } from 'react';

export default function AdminAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAnnouncement = () => {
    if (title.trim() && message.trim()) {
      const newAnnouncement = {
        id: Date.now(),
        title,
        message,
        createdAt: new Date().toLocaleDateString(),
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setTitle('');
      setMessage('');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Announcements</h1>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Create New Announcement</h2>
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Announcement Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
        ></textarea>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold" onClick={handleAddAnnouncement}>
          Post Announcement
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">All Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-gray-500">No announcements yet</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border border-gray-200 p-4 rounded-lg hover:shadow transition">
                <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                <p className="text-gray-600 mt-2">{announcement.message}</p>
                <div className="mt-4 flex justify-between items-center">
                  <small className="text-gray-500">{announcement.createdAt}</small>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
