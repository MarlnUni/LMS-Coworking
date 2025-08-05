export default function AdminEnrollUsers() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold mb-2">Enroll Users</h2>
      <p className="text-gray-300 mb-4">Add new users to the coworking LMS. You can invite users by email or upload a CSV file.</p>
      <div className="w-full max-w-md bg-white/10 rounded-lg p-4 mb-4">
        <input className="w-full p-2 rounded mb-2 text-blue-900" placeholder="Enter user email..." />
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Send Invite</button>
      </div>
      <div className="w-full max-w-md bg-white/10 rounded-lg p-4">
        <p className="text-sm text-gray-200 mb-2">Or upload a CSV file:</p>
        <input type="file" className="mb-2" />
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Upload</button>
      </div>
    </div>
  );
} 