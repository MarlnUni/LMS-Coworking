import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import InstructorDashboard from './components/Instructor/InstructorDashboard';
import ManagerDashboard from './components/Manager/ManagerDashboard';
import LearnerDashboard from './components/Learner/LearnerDashboard';
// Profile pages
import AdminProfile from './components/Profile/AdminProfile';
import ManagerProfile from './components/Profile/ManagerProfile';
import InstructorProfile from './components/Profile/InstructorProfile';
import LearnerProfile from './components/Profile/LearnerProfile';
// Admin pages
import EnrollUsers from './components/Admin/EnrollUsers';
import ManageUsers from './components/Admin/ManageUsers';
import ProgramManagement from './components/Admin/ProgramManagement';
import GradeSetup from './components/Admin/GradeSetup';
import ReportsAnalysis from './components/Admin/ReportsAnalysis';
// Manager pages
import ManagerManageTeam from './components/Manager/ManageTeam';
import ManagerProgramManagement from './components/Manager/ProgramManagement';
import ManagerReportsAnalysis from './components/Manager/ReportsAnalysis';
// Learner pages
import LearnerReportsAnalysis from './components/Learner/ReportsAnalysis';
// Instructor pages
import InstructorCourseManagement from './components/Instructor/CourseManagement';
import InstructorMyCourseStats from './components/Instructor/MyCourseStats';
import InstructorMyReports from './components/Instructor/MyReports';
import ManagerDashboardHome from './components/Manager/ManagerDashboardHome';
import LearnerDashboardHome from './components/Learner/LearnerDashboardHome';
import InstructorDashboardHome from './components/Instructor/InstructorDashboardHome';

function AppRoutes({ user, setUser }) {
  const navigate = useNavigate();

  // After login, redirect to the correct dashboard
  const handleLogin = (user) => {
    setUser(user);
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'manager' && user.instructor_flag) navigate('/instructor');
    else if (user.role === 'manager') navigate('/manager');
    else if (user.role === 'learner') navigate('/learner');
    else navigate('/');
  };

  // Handle logout - clear user state and redirect to login
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  // Handle profile navigation based on user role
  const handleProfile = () => {
    if (user.role === 'admin') navigate('/admin/profile');
    else if (user.role === 'manager' && user.instructor_flag) navigate('/instructor/profile');
    else if (user.role === 'manager') navigate('/manager/profile');
    else if (user.role === 'learner') navigate('/learner/profile');
  };

  // Handle back navigation from profile to dashboard
  const handleBackToDashboard = () => {
    if (user.role === 'admin') navigate('/admin');
    else if (user.role === 'manager' && user.instructor_flag) navigate('/instructor');
    else if (user.role === 'manager') navigate('/manager');
    else if (user.role === 'learner') navigate('/learner');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to={getDashboardPath(user)} /> : <Login onLogin={handleLogin} />}
      />
      <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
        <Route index element={<><h1 className="text-4xl font-bold mb-4">My Learning</h1><p className="text-lg">Welcome, {user?.name} (Admin). This is your learning dashboard.</p></>} />
        <Route path="enroll-users" element={<EnrollUsers />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="program-management" element={<ProgramManagement />} />
        <Route path="grade-setup" element={<GradeSetup />} />
        <Route path="reports-analysis" element={<ReportsAnalysis />} />
      </Route>
      <Route path="/admin/profile" element={user && user.role === 'admin' ? <AdminProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />
      <Route path="/manager" element={user && user.role === 'manager' && !user.instructor_flag ? <ManagerDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
        <Route index element={<ManagerDashboardHome user={user} />} />
        <Route path="manage-team" element={<ManagerManageTeam />} />
        <Route path="program-management" element={<ManagerProgramManagement />} />
        <Route path="reports-analysis" element={<ManagerReportsAnalysis />} />
      </Route>
      <Route path="/manager/profile" element={user && user.role === 'manager' && !user.instructor_flag ? <ManagerProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />
      <Route path="/learner" element={user && user.role === 'learner' ? <LearnerDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
        <Route index element={<LearnerDashboardHome user={user} />} />
        <Route path="reports-analysis" element={<LearnerReportsAnalysis />} />
      </Route>
      <Route path="/learner/profile" element={user && user.role === 'learner' ? <LearnerProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />
      <Route path="/instructor" element={user && user.role === 'manager' && user.instructor_flag ? <InstructorDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
        <Route index element={<InstructorDashboardHome user={user} />} />
        <Route path="course-management" element={<InstructorCourseManagement />} />
        <Route path="my-course-stats" element={<InstructorMyCourseStats />} />
        <Route path="my-reports" element={<InstructorMyReports />} />
      </Route>
      <Route path="/instructor/profile" element={user && user.role === 'manager' && user.instructor_flag ? <InstructorProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? getDashboardPath(user) : '/login'} />} />
    </Routes>
  );
}

function getDashboardPath(user) {
  if (!user) return '/login';
  if (user.role === 'admin') return '/admin';
  if (user.role === 'manager' && user.instructor_flag) return '/instructor';
  if (user.role === 'manager') return '/manager';
  if (user.role === 'learner') return '/learner';
  return '/login';
}

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <AppRoutes user={user} setUser={setUser} />
    </Router>
  );
}

export default App;
