import { Routes, Route, Navigate } from 'react-router';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import LandingPage from './LandingPage';
import NotFoundPage from './NotFoundPage';
import UnderDevelopment from '../components/ui/global/UnderDevelopment';
import {
  RequiredCompletedIdentity,
  RequiredInCompletedIdentity,
} from '../routes/IdentityGuard';

export {
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
};
