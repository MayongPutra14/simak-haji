// GLOBAL
import { Routes, Route, Navigate } from 'react-router';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';
import UnderDevelopment from '../components/ui/global/UnderDevelopment';
import {
  RequiredCompletedIdentity,
  RequiredInCompletedIdentity,
} from './IdentityGuard';

// ADMIN
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminScanPage from '../pages/admin/AdminScanPage';
import MateriPage from '../pages/user/MateriPage';
import CreateUserPage from '../pages/admin/CreateUserPage';

// USER
import IdentityPage from '../pages/user/IdentityPage';
import UserProfilePage from '../pages/user/UserProfilePage';
import UserLayout from '../layouts/UserLayout';
import UserHomePage from '../pages/user/UserHomePages';
import UserSchedulePage from '../pages/user/UserSchedulePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin-input" element={<CreateUserPage />} />
      <Route path="/under-development" element={<UnderDevelopment />} />

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminDashboardPage />} />
          <Route path="scan" element={<AdminScanPage />} />
        </Route>
      </Route>

      {/* USER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route element={<RequiredCompletedIdentity />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Navigate to={'home'} replace />} />

            <Route path="home" element={<UserHomePage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="jadwal" element={<UserSchedulePage />} />
            <Route path="materi" element={<MateriPage />} />
          </Route>
        </Route>

        <Route element={<RequiredInCompletedIdentity />}>
          <Route path="user/form" element={<IdentityPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
