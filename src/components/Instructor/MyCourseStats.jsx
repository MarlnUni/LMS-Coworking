import React from 'react';

export default function InstructorMyCourseStats() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-3xl font-bold mb-4">My Course Stats</h2>
      <p className="text-lg text-gray-200 mb-6">View statistics and analytics for your courses. Use this page to monitor course performance and learner engagement.</p>
      {/* Example content: */}
      <ul className="bg-purple-900 rounded-xl p-6 shadow-lg w-full max-w-xl">
        <li className="mb-2">- Enrollment numbers</li>
        <li className="mb-2">- Completion rates</li>
        <li className="mb-2">- Learner feedback</li>
        <li>- Identify high-performing courses</li>
      </ul>
    </div>
  );
} 