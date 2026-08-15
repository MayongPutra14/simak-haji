import { Routes, Route, Navigate } from 'react-router';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminScanPage from '../pages/AdminScanPage';
import UserDashboardPage from '../pages/UserDashboardPage';
import MateriPage from '../pages/MateriPage';
import IdentityPage from '../pages/IdentityPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
// import HomePage from '../pages/HomePage';
import UserProfilePage from '../pages/UserProfilePage';
import UserLayout from '../layouts/UserLayout';
import {
  RequiredCompletedIdentity,
  RequiredInCompletedIdentity,
} from './IdentityGuard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin-scan" element={<AdminScanPage />} />
      </Route>

      {/* USER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>

        <Route element={<RequiredCompletedIdentity />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Navigate to={'dashboard'} replace />} />

            <Route path="home" element={<UserDashboardPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="materi" element={<MateriPage />} />
          </Route>
        </Route>

        <Route element={<RequiredInCompletedIdentity />}>
          <Route path="/form-identity" element={<IdentityPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
