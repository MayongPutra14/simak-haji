import { Routes, Route, Navigate } from 'react-router';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProtectedRoute from '../../routes/ProtectedRoute';
import PublicRoute from '../../routes/PublicRoute';
import LandingPage from './LandingPage';
import NotFoundPage from './NotFoundPage';
import { UnderDevelopmentPage } from './UnderDevelopmentage';
import {
  RequiredCompletedIdentity,
  RequiredInCompletedIdentity,
} from '../../routes/IdentityGuard';
import { MaterialGuardRoute } from '../../routes/MaterialGuardRoute';
import QuranPage from './QuranPage';
import SurahReadingPage from './SurahReadingPage';
import HadithPage from './HadistPage';
import HadithListingPage from './ListHadiths';
import DoaPage from './DoaPage';
import HajjDuasPage from './HajjDuas/HajjDuasPage';
import HajjDuaListPage from './HajjDuas/HajjDuaListPage';
import HajjDuaDetailPage from './HajjDuas/HajjDuaDetailPage';

export {
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
  DoaPage,
  HajjDuasPage,
  HajjDuaListPage,
  HajjDuaDetailPage,
};
