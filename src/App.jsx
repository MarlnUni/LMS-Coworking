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

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to={getDashboardPath(user)} /> : <Login onLogin={handleLogin} />}
      />
      <Route
        path="/admin"
        element={user && user.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/instructor"
        element={user && user.role === 'manager' && user.instructor_flag ? <InstructorDashboard user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/manager"
        element={user && user.role === 'manager' && !user.instructor_flag ? <ManagerDashboard user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/learner"
        element={user && user.role === 'learner' ? <LearnerDashboard user={user} /> : <Navigate to="/login" />}
      />
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
