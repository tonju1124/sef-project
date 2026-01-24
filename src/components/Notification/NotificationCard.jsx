function NotificationCard({ title, timestamp, description }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default NotificationCard;
