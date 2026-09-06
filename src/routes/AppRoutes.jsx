// GLOBAL
import {
  Routes,
  Route,
  Navigate,
  LoginPage,
  RegisterPage,
  ProtectedRoute,
  LandingPage,
  NotFoundPage,
  UnderDevelopment,
  RequiredCompletedIdentity,
  RequiredInCompletedIdentity,
} from '../pages/index';

// ADMIN
import {
  // USER MANAGEMENT
  AdminHome,
  AdminLayout,
  CreateUserPage,
  ListUsersPage,
  UserDetailPage,
  UserEditPage,
} from '../pages/admin/index';

// USER
import {
  UserLayout,
  UserHomePage,
  UserProfilePage,
  UserSchedulePage,
  IdentityPage,
} from '../pages/user/index';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHome />} />

          {/* CRUD USER */}
          <Route path="users">
            <Route index element={<ListUsersPage />} />
            <Route path="create" element={<CreateUserPage />} />
            <Route path="detail/:userId" element={<UserDetailPage />} />
            <Route path="edit/:userId" element={<UserEditPage />} />
          </Route>
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
          </Route>
        </Route>

        <Route element={<RequiredInCompletedIdentity />}>
          <Route path="user/form" element={<IdentityPage />} />
        </Route>
      </Route>

      <Route path="/maintenance" element={<UnderDevelopment />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
