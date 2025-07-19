export default function ManagerDashboard({ user }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-green-700 to-green-400 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.name} (Manager)</h1>
      <p className="text-lg">This is the Manager Dashboard. You can view your team's course progress and analytics.</p>
    </div>
  );
} 