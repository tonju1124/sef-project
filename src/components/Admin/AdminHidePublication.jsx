import React, { useState } from 'react';

export default function AdminHidePublication() {
  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || pub.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleToggleHide = (id) => {
    setPublications(publications.map((pub) =>
      pub.id === id ? { ...pub, status: pub.status === 'visible' ? 'hidden' : 'visible' } : pub
    ));
  };

  const handleRemovePublication = (id) => {
    setPublications(publications.filter((pub) => pub.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">Hide Publication</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Publications</h2>
        
        <div className="flex gap-4 flex-col md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        {filteredPublications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No publications found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPublications.map((publication) => (
              <div
                key={publication.id}
                className={`border p-4 rounded-lg flex justify-between items-start ${
                  publication.status === 'hidden'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-white border-gray-200 hover:shadow-md'
                } transition`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{publication.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        publication.status === 'visible'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {publication.status === 'visible' ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">Author: <span className="font-medium">{publication.author}</span></p>
                  <p className="text-gray-600 mb-1">Category: <span className="font-medium">{publication.category}</span></p>
                  <p className="text-gray-600 mb-2">Uploaded: {publication.uploadDate}</p>
                  <p className="text-gray-700 text-sm line-clamp-2">{publication.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleToggleHide(publication.id)}
                    className={`px-4 py-2 rounded font-semibold transition ${
                      publication.status === 'visible'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {publication.status === 'visible' ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleRemovePublication(publication.id)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-blue-800 text-sm">
          <span className="font-semibold">Note:</span> Hidden publications are not visible to other users but the data remains in the database. Deleted publications are permanently removed.
        </p>
      </div>
    </div>
  );
}
