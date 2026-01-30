import { useUser } from "../../context/UserContext";
import { publications } from "../../data/publications";

function UserVerification() {
  const { user } = useUser();

  // Get publications where current user is author or coauthor
  const userPublications = publications.filter(
    pub => pub.author === user.name || pub.coauthor === user.name
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

  return (
    <div className="space-y-4">
      {userPublications.map((publication) => (
        <div
          key={publication.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start justify-between gap-4">
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
            <div className={`${getStatusColor(publication.status)} px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}>
              {getStatusLabel(publication.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserVerification;
