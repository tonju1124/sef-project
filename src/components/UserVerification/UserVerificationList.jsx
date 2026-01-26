import { publications } from "../../data/publications";

function UserVerification() {
  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-4">
      {publications.map((pub) => (
        <div
          key={pub.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {pub.title}
              </h2>
              <p className="text-gray-600 text-sm">
                Upload Date: {formatDate(pub.uploadDate)}
              </p>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              Verified
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserVerification;
