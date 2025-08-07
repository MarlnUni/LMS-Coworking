import { Outlet } from 'react-router-dom';
import ManagerSidebar from './ManagerSidebar';
import ProfileMenu from '../ProfileMenu';

export default function ManagerDashboard({ user, onLogout, onProfile }) {
  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-green-900 via-green-700 to-green-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end items-center p-4">
          <ProfileMenu 
            user={user} 
            onLogout={onLogout}
            onProfile={onProfile}
          />
        </div>
        <main className="flex-1 flex flex-col items-center justify-center">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
} 