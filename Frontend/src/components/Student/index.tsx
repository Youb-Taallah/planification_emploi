import React from 'react';
import ProfileIcon from './ProfileIcon';
import NotificationIcon from './NotificationIcon';
import DateDisplay from './DateDisplay';


export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  }
  

interface TopBarProps {
  student: string;
  notifications: Notification[];
}

const TopBar: React.FC<TopBarProps> = ({ student, notifications }) => {
  return (
    <header className="w-full py-3 px-4 md:px-6 bg-black-900/50 backdrop-blur-md border-b border-primary-500/10 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-primary-100">Espace Etudiant</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <DateDisplay />
          </div>
          <NotificationIcon notifications={notifications} />
          <ProfileIcon student={student} />
        </div>
      </div>
    </header>
  );
};

export default TopBar;