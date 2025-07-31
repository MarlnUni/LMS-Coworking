import { Outlet } from 'react-router-dom';
import LearnerSidebar from './LearnerSidebar';
import ProfileMenu from '../ProfileMenu';

export default function LearnerDashboard({ user, onLogout, onProfile }) {
  const handleToggleTheme = () => {
    // Handle theme toggle - could implement dark/light mode
    console.log('Theme toggle clicked');
    // You could implement theme switching logic here
  };

  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-orange-900 via-orange-700 to-orange-400 text-white">
      <LearnerSidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end items-center p-4">
          <ProfileMenu 
            user={user} 
            onLogout={onLogout}
            onProfile={onProfile}
            onToggleTheme={handleToggleTheme}
          />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
} 