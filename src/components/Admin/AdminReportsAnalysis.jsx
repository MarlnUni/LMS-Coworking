export default function AdminReportsAnalysis() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-3xl font-bold mb-4 text-red-100">Admin Analytics Dashboard</h2>
      <p className="text-lg text-red-200 mb-6 text-center max-w-2xl">
        Comprehensive system-wide analytics and administrative reports for monitoring overall LMS performance, user engagement, and institutional metrics.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* System Overview */}
        <div className="bg-red-900/50 rounded-xl p-6 shadow-lg border border-red-800">
          <h3 className="text-xl font-bold mb-3 text-red-100">System Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-red-200">Total Users:</span>
              <span className="font-bold text-white">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200">Active Courses:</span>
              <span className="font-bold text-white">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200">System Uptime:</span>
              <span className="font-bold text-green-400">99.8%</span>
            </div>
          </div>
        </div>

        {/* User Analytics */}
        <div className="bg-red-900/50 rounded-xl p-6 shadow-lg border border-red-800">
          <h3 className="text-xl font-bold mb-3 text-red-100">User Analytics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-red-200">New Registrations:</span>
              <span className="font-bold text-white">+127</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200">Active Learners:</span>
              <span className="font-bold text-white">1,892</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200">Completion Rate:</span>
              <span className="font-bold text-green-400">87.3%</span>
            </div>
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="bg-red-900/50 rounded-xl p-6 shadow-lg border border-red-800">
          <h3 className="text-xl font-bold mb-3 text-red-100">Compliance & Security</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-red-200">Security Score:</span>
              <span className="font-bold text-green-400">A+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200">Data Protection:</span>
              <span className="font-bold text-green-400">100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200">Audit Status:</span>
              <span className="font-bold text-green-400">Passed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-red-900/30 rounded-xl p-6 shadow-lg border border-red-800 w-full max-w-4xl">
        <h3 className="text-xl font-bold mb-4 text-red-100">Administrative Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            Export Reports
          </button>
          <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            User Management
          </button>
          <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            System Settings
          </button>
          <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
            Backup Data
          </button>
        </div>
      </div>
    </div>
  );
} 