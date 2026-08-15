import { useState } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
  // TAKE USER DATA IF USER HAS LOGGED
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_data');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // LOGIN FUNCTION
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  //  LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_data');
  };

  // FUNCTION TO CHANGE is_complete TO true AFTER FILL THE FORM
  const completeIdentity = () => {
    if (!user) return;
    const updatedUser = { ...user, is_completed: 1 };
    setUser(updatedUser);
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, completeIdentity }}>
      {children}
    </AuthContext.Provider>
  );
}
