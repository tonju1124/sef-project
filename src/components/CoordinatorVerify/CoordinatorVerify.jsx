import { useState } from 'react';
import { publications } from '../../data/publications';
import StatusDropdown from './StatusDropdown';
import { FilterDropdown } from './StatusDropdown';

function CoordinatorVerify() {
  const [pubStatuses, setPubStatuses] = useState(
    publications.reduce((acc, pub) => {
      acc[pub.id] = pub.status;
      return acc;
    }, {})
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleStatusChange = (pubId, newStatus) => {
    setPubStatuses(prev => ({
      ...prev,
      [pubId]: newStatus
    }));
  };

  // Filter publications based on search and status filter
  const filteredPublications = publications.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         publication.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || publication.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="mb-6">
        <FilterDropdown
          value={statusFilter}
          onSelect={setStatusFilter}
        />
      </div>
      
      <div className="space-y-4">
        {filteredPublications.map((publication) => (
          <div
            key={publication.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {publication.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  Author: {publication.author}
                </p>
                <p className="text-gray-600 text-sm">
                  Upload Date: {formatDate(publication.uploadDate)}
                </p>
                <p className="text-gray-600 text-sm">
                  Category: {publication.category.charAt(0).toUpperCase() + publication.category.slice(1)}
                </p>
              </div>
              <div className="shrink-0">
                <StatusDropdown
                  status={pubStatuses[publication.id]}
                  onChange={(newStatus) => handleStatusChange(publication.id, newStatus)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CoordinatorVerify;
