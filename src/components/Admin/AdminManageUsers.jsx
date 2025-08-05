export default function AdminManageUsers() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold mb-2">Manage Users</h2>
      <p className="text-gray-300 mb-4">View, edit, or remove users from the coworking LMS.</p>
      <div className="w-full max-w-lg bg-white/10 rounded-lg p-4">
        <table className="w-full text-left text-sm text-white">
          <thead>
            <tr className="border-b border-blue-800">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jane Doe</td>
              <td>jane@example.com</td>
              <td>Learner</td>
              <td><button className="text-blue-300 hover:underline">Edit</button></td>
            </tr>
            <tr>
              <td>John Smith</td>
              <td>john@example.com</td>
              <td>Manager</td>
              <td><button className="text-blue-300 hover:underline">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 