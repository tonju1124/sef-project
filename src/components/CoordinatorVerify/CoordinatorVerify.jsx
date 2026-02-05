import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import StatusDropdown from './StatusDropdown';
import { FilterDropdown } from './StatusDropdown';

function CoordinatorVerify({ searchQuery = '' }) {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('publications')
        .select('id, title, author_id, co_authors, created_at, publication_type, status, profiles(full_name, email)')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setPublications(data || []);
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format date from YYYY-MM-DDTHH:MM:SS to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleStatusChange = async (pubId, newStatus) => {
    try {
      setUpdatingId(pubId);
      const publication = publications.find(p => p.id === pubId);
      
      // Update publication status in database
      const { error: updateError } = await supabase
        .from('publications')
        .update({ status: newStatus.toLowerCase() })
        .eq('id', pubId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      // Create notification for the author
      const notificationTitle = newStatus.toLowerCase() === 'verified' 
        ? 'Publication Verified' 
        : 'Publication Rejected';
      
      const notificationMessage = newStatus.toLowerCase() === 'verified'
        ? `Your publication "${publication.title}" has been verified and is now published.`
        : `Your publication "${publication.title}" has been rejected. Please review the requirements and resubmit.`;

      const { error: notificationError } = await supabase
        .from('notifications')
        .insert([{
          user_id: publication.author_id,
          title: notificationTitle,
          message: notificationMessage,
          is_read: false
        }]);

      if (notificationError) {
        throw new Error(notificationError.message);
      }

      // Update local state
      setPublications(prev => prev.map(pub => 
        pub.id === pubId ? { ...pub, status: newStatus.toLowerCase() } : pub
      ));

      console.log(`Publication ${pubId} updated to ${newStatus} and notification sent`);
    } catch (err) {
      console.error('Error updating publication:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter publications based on search and status filter
  const filteredPublications = publications.filter(publication => {
    const author = publication.profiles?.full_name || publication.profiles?.email || 'Unknown';
    const matchesSearch = 
      publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (publication.co_authors && publication.co_authors.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || publication.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading publications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        Error loading publications: {error}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <FilterDropdown
          value={statusFilter}
          onSelect={setStatusFilter}
        />
      </div>
      
      <div className="space-y-4">
        {filteredPublications.length > 0 ? (
          filteredPublications.map((publication) => (
            <div
              key={publication.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {publication.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Author: {publication.profiles?.full_name || publication.profiles?.email || 'Unknown'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Upload Date: {formatDate(publication.created_at)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Type: {publication.publication_type ? publication.publication_type.charAt(0).toUpperCase() + publication.publication_type.slice(1) : 'N/A'}
                  </p>
                </div>
                <div className="shrink-0">
                  <StatusDropdown
                    status={publication.status}
                    onChange={(newStatus) => handleStatusChange(publication.id, newStatus)}
                    disabled={updatingId === publication.id}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No publications to verify</p>
        )}
      </div>
    </>
  );
}

export default CoordinatorVerify;
