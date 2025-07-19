export default function LearnerDashboard({ user }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900 via-cyan-700 to-cyan-400 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.name} (Learner)</h1>
      <p className="text-lg">This is your Learner Dashboard. You can view and enroll in courses, and track your progress.</p>
    </div>
  );
} 