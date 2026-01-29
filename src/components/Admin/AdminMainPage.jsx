import React from 'react';

export default function AdminMainPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Total Publications</h3>
          <p className="text-4xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Pending Announcements</h3>
          <p className="text-4xl font-bold text-yellow-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-gray-600 font-semibold mb-2">Active Notifications</h3>
          <p className="text-4xl font-bold text-purple-600">0</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity</p>
      </div>
    </div>
  );
}
