import { useUser } from "../../context/UserContext";
import { publications } from "../../data/publications";

function UserVerification() {
  const { user } = useUser();

  // Get publications where current user is author or coauthor
  const userPublications = publications.filter(
    pub => pub.author === user.userID || pub.coauthor === user.userID
  );

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split('-');
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

  return (
    <div className="space-y-4">
      {userPublications.map((publication) => (
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
                Upload Date: {formatDate(publication.uploadDate)}
              </p>
              <p className="text-gray-600 text-sm">
                Category: {publication.category.charAt(0).toUpperCase() + publication.category.slice(1)}
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
