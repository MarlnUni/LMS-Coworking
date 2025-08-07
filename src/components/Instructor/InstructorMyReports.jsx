import React from 'react';

export default function InstructorMyReports() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-100">Teaching Analytics Dashboard</h2>
      <p className="text-lg text-purple-200 mb-6 text-center max-w-2xl">
        Track your teaching effectiveness, student engagement, and course performance metrics to continuously improve your instructional delivery and student outcomes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Student Performance */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Student Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Total Students:</span>
              <span className="font-bold text-white">342</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Avg. Grade:</span>
              <span className="font-bold text-green-400">87.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Pass Rate:</span>
              <span className="font-bold text-green-400">94.5%</span>
            </div>
          </div>
        </div>

        {/* Course Analytics */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Course Analytics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Active Courses:</span>
              <span className="font-bold text-white">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Completion Rate:</span>
              <span className="font-bold text-green-400">89.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Student Satisfaction:</span>
              <span className="font-bold text-green-400">4.7/5</span>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Engagement Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Discussion Posts:</span>
              <span className="font-bold text-white">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Assignment Submissions:</span>
              <span className="font-bold text-green-400">98.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Office Hours Attendance:</span>
              <span className="font-bold text-green-400">76%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-purple-900/30 rounded-xl p-6 shadow-lg border border-purple-800 w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4 text-purple-100">Teaching Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Grade Assignments
          </button>
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Student Feedback
          </button>
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Course Analytics
          </button>
          <button className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            Export Reports
          </button>
        </div>
      </div>

      <div className="mt-6 bg-purple-900/20 rounded-xl p-4 shadow-lg border border-purple-800 w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-3 text-purple-100">Top Performing Courses</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-800/50 rounded-lg p-3">
            <div className="font-bold text-purple-100">Advanced Mathematics</div>
            <div className="text-sm text-purple-200">Avg. Grade: 92.1%</div>
          </div>
          <div className="bg-purple-800/50 rounded-lg p-3">
            <div className="font-bold text-purple-100">Data Science Fundamentals</div>
            <div className="text-sm text-purple-200">Avg. Grade: 89.7%</div>
          </div>
          <div className="bg-purple-800/50 rounded-lg p-3">
            <div className="font-bold text-purple-100">Business Strategy</div>
            <div className="text-sm text-purple-200">Avg. Grade: 88.3%</div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-purple-900/20 rounded-xl p-4 shadow-lg border border-purple-800 w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-3 text-purple-100">Student Feedback Highlights</h4>
        <div className="space-y-3">
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="text-sm text-purple-200 italic">"Excellent teaching methodology and clear explanations. Highly recommend!"</div>
            <div className="text-xs text-purple-300 mt-1">- Student in Advanced Mathematics</div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3">
            <div className="text-sm text-purple-200 italic">"Great practical examples and real-world applications."</div>
            <div className="text-xs text-purple-300 mt-1">- Student in Data Science</div>
          </div>
        </div>
      </div>
    </div>
  );
} 