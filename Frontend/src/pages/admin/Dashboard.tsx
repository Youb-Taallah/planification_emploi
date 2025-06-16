import React from 'react';
import WelcomeCard from '../../components/admin/dashboard/ui/WelcomeCard';
import StatsSection from '../../components/admin/dashboard/StatsSection';
import FileUploader from '../../components/admin/dashboard/ui/FileUploader';

const Dashboard: React.FC = () => {
  return (
    <div className="max-h-screen">
      <WelcomeCard username="Admin" />
      
      <div className="mb-8">
        <StatsSection />
      </div>
      
      <div>
        <FileUploader />
      </div>
    </div>
  );
};

export default Dashboard;