import React from 'react';

export default function InstructorCourseManagement() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-100">Course Management Hub</h2>
      <p className="text-lg text-purple-200 mb-6 text-center max-w-2xl">
        Create, organize, and manage your courses with comprehensive tools for content creation, student enrollment, and course delivery optimization.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Course Overview */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Course Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Active Courses:</span>
              <span className="font-bold text-white">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Draft Courses:</span>
              <span className="font-bold text-yellow-400">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Total Students:</span>
              <span className="font-bold text-white">342</span>
            </div>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Content Management</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Video Lessons:</span>
              <span className="font-bold text-white">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Assignments:</span>
              <span className="font-bold text-white">89</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Resources:</span>
              <span className="font-bold text-white">234</span>
            </div>
          </div>
        </div>

        {/* Student Engagement */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Student Engagement</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Avg. Completion:</span>
              <span className="font-bold text-green-400">89.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Discussion Activity:</span>
              <span className="font-bold text-green-400">High</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Feedback Score:</span>
              <span className="font-bold text-green-400">4.7/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-purple-900/30 rounded-xl p-6 shadow-lg border border-purple-800 w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4 text-purple-100">Course Management Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Create Course
          </button>
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Edit Content
          </button>
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Manage Students
          </button>
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Course Settings
          </button>
        </div>
      </div>

      <div className="mt-6 bg-purple-900/20 rounded-xl p-4 shadow-lg border border-purple-800 w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-3 text-purple-100">Recent Course Activities</h4>
        <div className="space-y-3">
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-100">Advanced Mathematics</div>
                <div className="text-sm text-purple-200">New assignment uploaded</div>
              </div>
              <div className="text-xs text-purple-300">2 hours ago</div>
            </div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-100">Data Science Fundamentals</div>
                <div className="text-sm text-purple-200">Course content updated</div>
              </div>
              <div className="text-xs text-purple-300">1 day ago</div>
            </div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-100">Business Strategy</div>
                <div className="text-sm text-purple-200">New student enrolled</div>
              </div>
              <div className="text-xs text-purple-300">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 