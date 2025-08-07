import React from 'react';
import { Link } from 'react-router-dom';

export default function InstructorDashboardHome({ user }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name || 'Instructor'}!</h1>
      <p className="text-lg text-gray-200 mb-4">This is your Instructor Dashboard. Here you can manage your courses, view stats, and access reports.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-4xl">
        <Link to="/instructor" className="bg-purple-800 hover:bg-purple-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">My Learning</span>
          <span className="text-gray-300">Access your assigned courses and learning materials.</span>
        </Link>
        <Link to="/instructor/course-management" className="bg-purple-800 hover:bg-purple-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">Course Management</span>
          <span className="text-gray-300">Create, edit, and assign courses to learners.</span>
        </Link>
        <Link to="/instructor/my-course-stats" className="bg-purple-800 hover:bg-purple-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">My Course Stats</span>
          <span className="text-gray-300">View statistics and analytics for your courses.</span>
        </Link>
        <Link to="/instructor/my-reports" className="bg-purple-800 hover:bg-purple-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">My Reports</span>
          <span className="text-gray-300">Access detailed reports on your teaching activities.</span>
        </Link>
      </div>
    </div>
  );
} 