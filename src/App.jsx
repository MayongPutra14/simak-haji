import { BrowserRouter, Routes, Route } from 'react-router';
import { FormPage } from './pages/FormPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
