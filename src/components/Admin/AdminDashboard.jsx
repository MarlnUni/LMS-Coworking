export default function AdminDashboard({ user }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.name} (Admin)</h1>
      <p className="text-lg">This is the Admin Dashboard. You have full access to the LMS.</p>
    </div>
  );
} 