import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../config/supabaseClient";

function UserVerification() {
  const { user } = useUser();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchUserPublications();
    }
  }, [user?.id]);

  const fetchUserPublications = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('publications')
        .select('id, title, status, created_at, publication_type')
        .eq('author_id', user.id)
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your publications...</p>
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

  if (publications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">You haven't uploaded any publications yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {publications.map((publication) => (
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
                Upload Date: {formatDate(publication.created_at)}
              </p>
              <p className="text-gray-600 text-sm">
                Type: {publication.publication_type ? publication.publication_type.charAt(0).toUpperCase() + publication.publication_type.slice(1) : 'N/A'}
              </p>
            </div>
            <div className={`${getStatusColor(publication.status)} px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex justify-center items-center gap-2`}>
              {getStatusIcon(publication.status)}
              {getStatusLabel(publication.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserVerification;
