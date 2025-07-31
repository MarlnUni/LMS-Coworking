export default function ProgramManagement() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold mb-2">Program Management</h2>
      <p className="text-gray-300 mb-4">Create, edit, or archive learning programs for your organization.</p>
      <div className="w-full max-w-lg bg-white/10 rounded-lg p-4">
        <ul className="list-disc pl-6 text-white">
          <li>Onboarding Program <span className="text-xs text-blue-200 ml-2">Active</span></li>
          <li>Leadership Training <span className="text-xs text-blue-200 ml-2">Draft</span></li>
          <li>Compliance Course <span className="text-xs text-blue-200 ml-2">Archived</span></li>
        </ul>
        <button className="mt-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">Add New Program</button>
      </div>
    </div>
  );
} 