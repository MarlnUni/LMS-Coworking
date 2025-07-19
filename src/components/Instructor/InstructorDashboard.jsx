export default function InstructorDashboard({ user }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-400 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.name} (Instructor)</h1>
      <p className="text-lg">This is the Instructor Dashboard. You can create and assign courses, and view analytics for your courses.</p>
    </div>
  );
} 