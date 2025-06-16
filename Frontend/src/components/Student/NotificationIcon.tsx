import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { getRelativeTime } from '../../utils/dateUtils';
import Badge from '../ui/Badge2';

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }

interface NotificationIconProps {
  notifications: Notification[];
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-black-200/20 transition-colors"
        aria-expanded={isOpen}
      >
        <Bell className="h-6 w-6 text-black-400" />
        
        {/* Unread indicator */}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Notifications dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-[70vh] overflow-y-auto rounded-lg bg-white shadow-lg ring-1 ring-black-200 animate-fade-in z-10">
          <div className="p-3 border-b border-black-100">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-black-900">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="primary">{unreadCount} new</Badge>
              )}
            </div>
          </div>
          
          <div className="py-1">
            {notifications.length === 0 ? (
              <p className="px-4 py-2 text-sm text-black-500 text-center">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-black-50 transition-colors ${notification.read ? '' : 'bg-primary-50/20'}`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-black-900">{notification.title}</p>
                    <span className="text-xs text-black-500">{getRelativeTime(notification.timestamp)}</span>
                  </div>
                  <p className="text-xs text-black-600 mt-1">{notification.message}</p>
                </div>
              ))
            )}
          </div>
          
          <div className="p-2 border-t border-black-100">
            <a href="#" className="block p-2 text-xs text-center text-primary-600 hover:text-primary-700 font-medium">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;