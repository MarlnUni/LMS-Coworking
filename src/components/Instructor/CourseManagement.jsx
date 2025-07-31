import React from 'react';

export default function InstructorCourseManagement() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-3xl font-bold mb-4">Course Management</h2>
      <p className="text-lg text-gray-200 mb-6">Create, edit, and assign courses to learners. Use this page to manage your course content and assignments.</p>
      {/* Example content: */}
      <ul className="bg-purple-900 rounded-xl p-6 shadow-lg w-full max-w-xl">
        <li className="mb-2">- Create new courses</li>
        <li className="mb-2">- Edit existing courses</li>
        <li className="mb-2">- Assign courses to learners</li>
        <li>- View course feedback</li>
      </ul>
    </div>
  );
} 