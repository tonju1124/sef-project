import { useUser } from "../../context/UserContext";

function UserVerification() {
  const { user } = useUser();

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
      {user.verification.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.publicationTitle}
              </h2>
              <p className="text-gray-600 text-sm">
                Submission Date: {formatDate(item.submissionDate)}
              </p>
              {item.verificationDate && (
                <p className="text-gray-600 text-sm">
                  Verification Date: {formatDate(item.verificationDate)}
                </p>
              )}
            </div>
            <div className={`${getStatusColor(item.status)} px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}>
              {getStatusLabel(item.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserVerification;
