import React from 'react';

export default function InstructorMyReports() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-3xl font-bold mb-4">My Reports</h2>
      <p className="text-lg text-gray-200 mb-6">Access detailed reports on your teaching activities. Use this page to review your performance and export reports.</p>
      {/* Example content: */}
      <ul className="bg-purple-900 rounded-xl p-6 shadow-lg w-full max-w-xl">
        <li className="mb-2">- Download teaching reports</li>
        <li className="mb-2">- Analyze learner progress</li>
        <li className="mb-2">- Review feedback and ratings</li>
        <li>- Export data for further analysis</li>
      </ul>
    </div>
  );
} 