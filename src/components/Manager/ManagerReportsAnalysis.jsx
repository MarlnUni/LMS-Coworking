import React from 'react';

export default function ManagerReportsAnalysis() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-3xl font-bold mb-4 text-green-100">Team Performance Analytics</h2>
      <p className="text-lg text-green-200 mb-6 text-center max-w-2xl">
        Monitor your team's learning progress, identify top performers, and track project-based skill development to optimize team productivity and growth.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Team Overview */}
        <div className="bg-green-900/50 rounded-xl p-6 shadow-lg border border-green-800">
          <h3 className="text-xl font-bold mb-3 text-green-100">Team Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-200">Team Size:</span>
              <span className="font-bold text-white">24 Members</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-200">Active Projects:</span>
              <span className="font-bold text-white">8 Projects</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-200">Team Performance:</span>
              <span className="font-bold text-green-400">92%</span>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-green-900/50 rounded-xl p-6 shadow-lg border border-green-800">
          <h3 className="text-xl font-bold mb-3 text-green-100">Learning Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-200">Courses Completed:</span>
              <span className="font-bold text-white">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-200">Avg. Completion:</span>
              <span className="font-bold text-green-400">85.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-200">Skill Gaps:</span>
              <span className="font-bold text-yellow-400">3 Areas</span>
            </div>
          </div>
        </div>

        {/* Project Success */}
        <div className="bg-green-900/50 rounded-xl p-6 shadow-lg border border-green-800">
          <h3 className="text-xl font-bold mb-3 text-green-100">Project Success</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-200">On-Time Delivery:</span>
              <span className="font-bold text-green-400">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-200">Client Satisfaction:</span>
              <span className="font-bold text-green-400">4.8/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-200">Budget Adherence:</span>
              <span className="font-bold text-green-400">97%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-green-900/30 rounded-xl p-6 shadow-lg border border-green-800 w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4 text-green-100">Team Management Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Performance Review
          </button>
          <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Skill Assessment
          </button>
          <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Team Training
          </button>
          <button className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Project Reports
          </button>
        </div>
      </div>

      <div className="mt-6 bg-green-900/20 rounded-xl p-4 shadow-lg border border-green-800 w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-3 text-green-100">Top Performers This Month</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-800/50 rounded-lg p-3">
            <div className="font-bold text-green-100">Sarah Johnson</div>
            <div className="text-sm text-green-200">Completed 8 courses</div>
          </div>
          <div className="bg-green-800/50 rounded-lg p-3">
            <div className="font-bold text-green-100">Mike Chen</div>
            <div className="text-sm text-green-200">Led 3 projects</div>
          </div>
          <div className="bg-green-800/50 rounded-lg p-3">
            <div className="font-bold text-green-100">Lisa Rodriguez</div>
            <div className="text-sm text-green-200">Mentored 5 team members</div>
          </div>
        </div>
      </div>
    </div>
  );
} 