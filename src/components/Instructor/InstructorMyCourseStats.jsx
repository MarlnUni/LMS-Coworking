import React from 'react';

export default function InstructorMyCourseStats() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-100">Course Performance Analytics</h2>
      <p className="text-lg text-purple-200 mb-6 text-center max-w-2xl">
        Comprehensive statistics and performance metrics for all your courses. Track enrollment trends, completion rates, and student satisfaction to optimize your teaching effectiveness.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Enrollment Statistics */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Enrollment Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Total Enrollments:</span>
              <span className="font-bold text-white">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Active Students:</span>
              <span className="font-bold text-green-400">892</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">New This Month:</span>
              <span className="font-bold text-blue-400">+156</span>
            </div>
          </div>
        </div>

        {/* Completion Metrics */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Completion Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Avg. Completion Rate:</span>
              <span className="font-bold text-green-400">87.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Certificates Issued:</span>
              <span className="font-bold text-white">1,089</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Dropout Rate:</span>
              <span className="font-bold text-red-400">12.7%</span>
            </div>
          </div>
        </div>

        {/* Student Satisfaction */}
        <div className="bg-purple-900/50 rounded-xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-bold mb-3 text-purple-100">Student Satisfaction</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-purple-200">Overall Rating:</span>
              <span className="font-bold text-green-400">4.7/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Positive Reviews:</span>
              <span className="font-bold text-green-400">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-200">Recommendation Rate:</span>
              <span className="font-bold text-green-400">96%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-purple-900/30 rounded-xl p-6 shadow-lg border border-purple-800 w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4 text-purple-100">Top Performing Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-800/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-purple-100">Advanced Mathematics</h4>
              <span className="text-green-400 font-bold">4.9/5</span>
            </div>
            <div className="text-sm text-purple-200 space-y-1">
              <div>Enrollments: 234</div>
              <div>Completion: 92%</div>
              <div>Avg. Grade: 89.2%</div>
            </div>
          </div>
          <div className="bg-purple-800/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-purple-100">Data Science Fundamentals</h4>
              <span className="text-green-400 font-bold">4.8/5</span>
            </div>
            <div className="text-sm text-purple-200 space-y-1">
              <div>Enrollments: 189</div>
              <div>Completion: 88%</div>
              <div>Avg. Grade: 87.5%</div>
            </div>
          </div>
          <div className="bg-purple-800/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-purple-100">Business Strategy</h4>
              <span className="text-green-400 font-bold">4.7/5</span>
            </div>
            <div className="text-sm text-purple-200 space-y-1">
              <div>Enrollments: 156</div>
              <div>Completion: 85%</div>
              <div>Avg. Grade: 86.1%</div>
            </div>
          </div>
          <div className="bg-purple-800/50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-purple-100">Digital Marketing</h4>
              <span className="text-green-400 font-bold">4.6/5</span>
            </div>
            <div className="text-sm text-purple-200 space-y-1">
              <div>Enrollments: 198</div>
              <div>Completion: 83%</div>
              <div>Avg. Grade: 84.3%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-purple-900/20 rounded-xl p-4 shadow-lg border border-purple-800 w-full max-w-4xl">
        <h4 className="text-lg font-bold mb-3 text-purple-100">Performance Trends</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">+15%</div>
            <div className="text-sm text-purple-200">Enrollment Growth</div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">+8%</div>
            <div className="text-sm text-purple-200">Completion Rate</div>
          </div>
          <div className="bg-purple-800/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">+12%</div>
            <div className="text-sm text-purple-200">Student Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
} 