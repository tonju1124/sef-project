import { useState } from 'react';

/**
 * NotificationCard Component
 * 
 * Displays a single notification in a card/list format.
 * Shows notification title, timestamp, and description.
 * Unread notifications are highlighted.
 * Long descriptions can be expanded/collapsed.
 */
function NotificationCard({ id, title, timestamp, description, isRead, onMarkAsRead }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const MAX_CHARS = 150;
  const isLongText = description && description.length > MAX_CHARS;
  const displayText = isExpanded ? description : description?.substring(0, MAX_CHARS);

  const handleCardHover = () => {
    if (!isRead && onMarkAsRead) {
      onMarkAsRead(id);
    }
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      onMouseEnter={handleCardHover}
      className={`flex items-start gap-3 pb-4 border-b border-gray-200 p-4 rounded-lg transition-colors ${
        isRead 
          ? 'bg-white hover:bg-gray-50' 
          : 'bg-blue-50 hover:bg-blue-100'
      }`}
    >
      {!isRead && (
        <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 shrink-0"></div>
      )}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-lg font-semibold ${isRead ? 'text-gray-700' : 'text-gray-900'}`}>
            {title}
          </h3>
          <span className={`text-sm whitespace-nowrap ml-4 ${isRead ? 'text-gray-400' : 'text-gray-600'}`}>
            {timestamp}
          </span>
        </div>
        <p className={`text-sm ${isRead ? 'text-gray-500' : 'text-gray-700'} break-words`}>
          {displayText}
          {isLongText && !isExpanded && '...'}
        </p>
        {isLongText && (
          <button
            onClick={handleExpandClick}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationCard;
