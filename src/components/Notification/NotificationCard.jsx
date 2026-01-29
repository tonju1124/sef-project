function NotificationCard({ title, timestamp, description }) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default NotificationCard;
