export default function ReportsAnalysis() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold mb-2">Reports & Analysis</h2>
      <p className="text-gray-300 mb-4">View analytics and reports on user progress, course completion, and engagement.</p>
      <div className="w-full max-w-lg bg-white/10 rounded-lg p-4 flex flex-col items-center">
        <div className="w-32 h-32 bg-blue-800 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-white">87%</span>
        </div>
        <p className="text-sm text-blue-200">Overall course completion rate</p>
      </div>
    </div>
  );
} 