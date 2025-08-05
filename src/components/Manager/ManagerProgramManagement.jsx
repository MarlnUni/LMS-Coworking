import React from 'react';

export default function ManagerProgramManagement() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-3xl font-bold mb-4">Program Management</h2>
      <p className="text-lg text-gray-200 mb-6">Oversee learning programs and assign courses to your team. Use this page to manage program details and assignments.</p>
      {/* Example content: */}
      <ul className="bg-green-900 rounded-xl p-6 shadow-lg w-full max-w-xl">
        <li className="mb-2">- View all active programs</li>
        <li className="mb-2">- Assign courses to team members</li>
        <li className="mb-2">- Track program progress and completion</li>
        <li>- Edit or archive programs</li>
      </ul>
    </div>
  );
} 