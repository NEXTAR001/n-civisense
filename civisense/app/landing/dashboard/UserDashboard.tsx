import React from 'react';
import Sidebar from './components/Sidebar';
import ChatSection from './components/ChatSection';
import NewsFeed from './components/NewsFeed';

const UserDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <ChatSection />
      <NewsFeed />
    </div>
  );
};

export default UserDashboard;
