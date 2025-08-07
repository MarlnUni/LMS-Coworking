import React from 'react';
import { Link } from 'react-router-dom';

export default function ManagerDashboardHome({ user }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name || 'Manager'}!</h1>
      <p className="text-lg text-gray-200 mb-4">This is your Manager Dashboard. Here you can manage your team, oversee programs, and analyze reports.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <Link to="/manager/manage-team" className="bg-green-800 hover:bg-green-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">Manage Team</span>
          <span className="text-gray-300">Add, remove, or update your team members and assign roles.</span>
        </Link>
        <Link to="/manager/program-management" className="bg-green-800 hover:bg-green-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">Program Management</span>
          <span className="text-gray-300">Oversee learning programs and assign courses to your team.</span>
        </Link>
        <Link to="/manager/reports-analysis" className="bg-green-800 hover:bg-green-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">Reports & Analysis</span>
          <span className="text-gray-300">View analytics and reports on your team’s learning progress.</span>
        </Link>
      </div>
    </div>
  );
} 