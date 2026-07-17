import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Students from './pages/Students.jsx';
import Courses from './pages/Courses.jsx';
import Assignments from './pages/Assignments.jsx';
import Resources from './pages/Resources.jsx';
import Infrastructure from './pages/Infrastructure.jsx';
import Settings from './pages/Settings.jsx';

// Route table: /login is public; everything else is nested under the protected
// Layout (sidebar + top bar).
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
