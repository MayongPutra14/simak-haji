import { BrowserRouter, Routes, Route } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DasboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useState } from 'react';

function App() {
  const [isAuthenticate, setIsAuthenticate] = useState(() => {
    return Boolean(localStorage.getItem('token'));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticate} />}>
          <Route path="/dashboard" element={<DasboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
