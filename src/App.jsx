import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
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
import AdminEnrollUsers from './components/Admin/AdminEnrollUsers';
import AdminManageUsers from './components/Admin/AdminManageUsers';
import AdminProgramManagement from './components/Admin/AdminProgramManagement';
import AdminGradeSetup from './components/Admin/AdminGradeSetup';
import AdminReportsAnalysis from './components/Admin/AdminReportsAnalysis';
// Manager pages
import ManagerManageTeam from './components/Manager/ManagerManageTeam';
import ManagerProgramManagement from './components/Manager/ManagerProgramManagement';
import ManagerReportsAnalysis from './components/Manager/ManagerReportsAnalysis';
// Instructor pages
import InstructorCourseManagement from './components/Instructor/InstructorCourseManagement';
import InstructorMyCourseStats from './components/Instructor/InstructorMyCourseStats';
import InstructorMyReports from './components/Instructor/InstructorMyReports';
// Learner pages
import LearnerMyLearning from './components/Learner/LearnerMyLearning';
import LearnerReportsAnalysis from './components/Learner/LearnerReportsAnalysis';
// My Learning pages for all roles
import AdminMyLearning from './components/Admin/AdminMyLearning';
import ManagerMyLearning from './components/Manager/ManagerMyLearning';
import InstructorMyLearning from './components/Instructor/InstructorMyLearning';
import { users } from './mock/users';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    // Navigate based on role
    switch (userData.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'manager':
        navigate('/manager');
        break;
      case 'instructor':
        navigate('/instructor');
        break;
      case 'learner':
        navigate('/learner');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleProfile = () => {
    switch (user.role) {
      case 'admin':
        navigate('/admin/profile');
        break;
      case 'manager':
        navigate('/manager/profile');
        break;
      case 'instructor':
        navigate('/instructor/profile');
        break;
      case 'learner':
        navigate('/learner/profile');
        break;
      default:
        break;
    }
  };

  const handleBackToDashboard = () => {
    switch (user.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'manager':
        navigate('/manager');
        break;
      case 'instructor':
        navigate('/instructor');
        break;
      case 'learner':
        navigate('/learner');
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} users={users} /> : <Navigate to={`/${user.role}`} />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
          <Route index element={<Navigate to="/admin/my-learning" replace />} />
          <Route path="my-learning" element={<AdminMyLearning user={user} />} />
          <Route path="enroll-users" element={<AdminEnrollUsers />} />
          <Route path="manage-users" element={<AdminManageUsers />} />
          <Route path="program-management" element={<AdminProgramManagement />} />
          <Route path="grade-setup" element={<AdminGradeSetup />} />
          <Route path="reports-analysis" element={<AdminReportsAnalysis />} />
        </Route>
        <Route path="/admin/profile" element={user && user.role === 'admin' ? <AdminProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />

        {/* Manager Routes */}
        <Route path="/manager" element={user && user.role === 'manager' ? <ManagerDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
          <Route index element={<Navigate to="/manager/my-learning" replace />} />
          <Route path="my-learning" element={<ManagerMyLearning user={user} />} />
          <Route path="manage-team" element={<ManagerManageTeam />} />
          <Route path="program-management" element={<ManagerProgramManagement />} />
          <Route path="reports-analysis" element={<ManagerReportsAnalysis />} />
        </Route>
        <Route path="/manager/profile" element={user && user.role === 'manager' ? <ManagerProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />

        {/* Instructor Routes */}
        <Route path="/instructor" element={user && user.role === 'instructor' ? <InstructorDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
          <Route index element={<Navigate to="/instructor/my-learning" replace />} />
          <Route path="my-learning" element={<InstructorMyLearning user={user} />} />
          <Route path="course-management" element={<InstructorCourseManagement />} />
          <Route path="my-course-stats" element={<InstructorMyCourseStats />} />
          <Route path="my-reports" element={<InstructorMyReports />} />
        </Route>
        <Route path="/instructor/profile" element={user && user.role === 'instructor' ? <InstructorProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />

        {/* Learner Routes */}
        <Route path="/learner" element={user && user.role === 'learner' ? <LearnerDashboard user={user} onLogout={handleLogout} onProfile={handleProfile} /> : <Navigate to="/login" /> }>
          <Route index element={<Navigate to="/learner/my-learning" replace />} />
          <Route path="my-learning" element={<LearnerMyLearning user={user} />} />
          <Route path="reports-analysis" element={<LearnerReportsAnalysis />} />
        </Route>
        <Route path="/learner/profile" element={user && user.role === 'learner' ? <LearnerProfile user={user} onBack={handleBackToDashboard} /> : <Navigate to="/login" />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  // Only use basename in production (GitHub Pages)
  const basename = import.meta.env.PROD ? "/LMS-Coworking" : undefined;
  
  return (
    <ThemeProvider>
      <Router 
        basename={basename}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
      </Router>
    </ThemeProvider>
  );
}

export default AppWrapper;
