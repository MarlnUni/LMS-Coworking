import React from 'react';
import { Link } from 'react-router-dom';

export default function LearnerDashboardHome({ user }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name || 'Learner'}!</h1>
      <p className="text-lg text-gray-200 mb-4">This is your Learner Dashboard. Here you can access your courses and view your learning progress.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link to="/learner" className="bg-cyan-800 hover:bg-cyan-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">My Learning</span>
          <span className="text-gray-300">View and continue your enrolled courses.</span>
        </Link>
        <Link to="/learner/reports-analysis" className="bg-cyan-800 hover:bg-cyan-700 rounded-xl p-6 shadow-lg flex flex-col items-center">
          <span className="text-2xl font-bold mb-2">Reports & Analysis</span>
          <span className="text-gray-300">Track your progress and view analytics on your learning journey.</span>
        </Link>
      </div>
    </div>
  );
} 