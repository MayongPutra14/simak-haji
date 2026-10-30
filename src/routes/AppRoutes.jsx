// GLOBAL
import {
  Routes,
  Route,
  Navigate,
  LoginPage,
  RegisterPage,
  ProtectedRoute,
  PublicRoute,
  LandingPage,
  NotFoundPage,
  UnderDevelopmentPage,
  RequiredCompletedIdentity,
  RequiredInCompletedIdentity,
  MaterialGuardRoute,
  QuranPage,
  SurahReadingPage,
  HadithPage,
  HadithListingPage,
} from '../pages/global/index';

// ADMIN
import {
  AdminHome,
  AdminLayout,
  AdminProfilePage,
  // USER MANAGEMENT
  CreateUserPage,
  ListUsersPage,
  UserDetailPage,
  UserEditPage,
  // EVENT MANAGEMENT
  CreateEventPage,
  ListEventsPage,
  DetailEventPage,
  EditEventPage,
  // LANDING PAGE
  EditLandingPage,
} from '../pages/admin/index';

// USER
import {
  UserLayout,
  UserHomePage,
  UserProfilePage,
  UserSchedulePage,
  IdentityPage,
  ScanQrPage,
  UserMaterialPage,
} from '../pages/user/index';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="quran">
        <Route index element={<QuranPage />} />
        <Route path="read/:surahId" element={<SurahReadingPage />} />
      </Route>

      <Route path="hadiths">
        <Route index element={<HadithPage />} />
        <Route path="list/:slug" element={<HadithListingPage />} />
      </Route>

      {/* PUBLIC/GUEST ROUTES */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="profile" element={<AdminProfilePage />} />

          {/* LANDING PAGE */}
          <Route path="landing-page/edit">
            <Route index element={<Navigate to="hero" replace />} />
            <Route path=":sectionKey" element={<EditLandingPage />} />
          </Route>

          {/* CRUD USER */}
          <Route path="users">
            <Route index element={<ListUsersPage />} />
            <Route path="create" element={<CreateUserPage />} />
            <Route path="detail/:userId" element={<UserDetailPage />} />
            <Route path="edit/:userId" element={<UserEditPage />} />
          </Route>

          {/* CRUD EVENT */}
          <Route path="events">
            <Route index element={<ListEventsPage />} />
            <Route path="create" element={<CreateEventPage />} />
            <Route path="detail/:eventId" element={<DetailEventPage />} />
            <Route path="edit/:eventId" element={<EditEventPage />} />
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
            <Route path="schedules" element={<UserSchedulePage />} />
            <Route path="scan" element={<ScanQrPage />} />
          </Route>

          {/* FULL SCREEN MATERIAL PDF */}
          <Route element={<MaterialGuardRoute />}>
            <Route path="/user/materi/:id" element={<UserMaterialPage />} />
          </Route>
        </Route>

        <Route element={<RequiredInCompletedIdentity />}>
          <Route path="user/form" element={<IdentityPage />} />
        </Route>
      </Route>

      <Route path="/maintenance" element={<UnderDevelopmentPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
