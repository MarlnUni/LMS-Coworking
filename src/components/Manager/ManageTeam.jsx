import React from 'react';

export default function ManagerManageTeam() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-3xl font-bold mb-4">Manage Team</h2>
      <p className="text-lg text-gray-200 mb-6">Add, remove, or update your team members and assign roles. Use this page to keep your team structure up to date.</p>
      {/* Example content: */}
      <ul className="bg-green-900 rounded-xl p-6 shadow-lg w-full max-w-xl">
        <li className="mb-2">- View all team members</li>
        <li className="mb-2">- Assign roles and permissions</li>
        <li className="mb-2">- Add or remove users from your team</li>
        <li>- Monitor team activity and progress</li>
      </ul>
    </div>
  );
} 