import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './features/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
