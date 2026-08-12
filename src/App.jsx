import { BrowserRouter, Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminScanPage from './pages/AdminScanPage.jsx';
import UserDashboardPage from './pages/UserDashboardPage.jsx';
import MateriPage from './pages/MateriPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin-scan" element={<AdminScanPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          <Route path="/materi" element={<MateriPage />} />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
