import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationSidebar from './components/NavigationSidebar';
import UserDropdown from './components/UserDropdown';
import { useUser } from './context/UserContext';
import { supabase } from './config/supabaseClient';
import PublicationHeader from './components/PublicationPage/PublicationHeader';
import PublicationInfo from './components/PublicationPage/PublicationInfo';
import PublicationDescription from './components/PublicationPage/PublicationDescription';
import FilePreview from './components/PublicationPage/FilePreview';

/**
 * PublicationPage Component
 * 
 * Detailed view page for a single publication.
 * Displays comprehensive information about the publication including title, authors,
 * description, status, and file previews.
 */
function PublicationPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    fetchPublication();
  }, [id]);

  const fetchPublication = async () => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*, profiles(full_name, email)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching publication:', error);
        setLoading(false);
        return;
      }

      setPublication(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Loading publication...</h2>
        </div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Publication Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /**
   * Formats a date string from YYYY-MM-DD to DD/MM/YYYY format
   * Returns "N/A" if date string is invalid or missing
   * 
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {string} Formatted date in DD/MM/YYYY format or "N/A"
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 text-black flex flex-col items-start justify-start relative select-none pt-20 pl-20 page-transition">
      <NavigationSidebar navOpen={navOpen} setNavOpen={setNavOpen} />
      <UserDropdown navOpen={navOpen} userOpen={userOpen} setUserOpen={setUserOpen} />
      <div className={`z-20 w-full pr-20 ${navOpen ? "blur-sm" : ""}`}>
        {/* Main Content Container */}
        <div className="w-full bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <PublicationHeader 
            title={publication.title}
            status={publication.status}
            author={publication.profiles?.full_name || publication.profiles?.email || 'Unknown'}
            coauthor={publication.co_authors}
            uploadDate={formatDate(publication.created_at?.split('T')[0])}
            category={publication.category}
            formatDate={formatDate}
          />
          
          <PublicationDescription description={publication.description} />

          {/* Publication Files */}
          {publication.publication_files && publication.publication_files.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Publication Files</h2>
              {publication.publication_files.map((fileUrl, index) => (
                <div key={index} className="mb-4">
                  <FilePreview 
                    title={`Publication File ${index + 1}`}
                    type={fileUrl.split('.').pop().toUpperCase() + ' document'}
                    fileUrl={fileUrl}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Proof Files */}
          {publication.proof_files && publication.proof_files.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Proof Files</h2>
              {publication.proof_files.map((fileUrl, index) => (
                <div key={index} className="mb-4">
                  <FilePreview 
                    title={`Proof File ${index + 1}`}
                    type={fileUrl.split('.').pop().toUpperCase() + ' document'}
                    fileUrl={fileUrl}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicationPage;
