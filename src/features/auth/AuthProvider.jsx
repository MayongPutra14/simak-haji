import { useState, useMemo, useCallback } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
  // TAKE USER DATA IF USER HAS LOGGED
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user_data');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (_error) {
      localStorage.removeItem('user_data');
      return null;
    }
  });

  // LOGIN FUNCTION
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  }, []);

  //  LOGOUT FUNCTION
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user_data');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('identity_form_draft_guest');
  }, []);

  // FUNCTION TO CHANGE is_complete TO true AFTER FILL THE FORM
  const completeIdentity = useCallback(() => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, is_completed: 1 };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ user, login, logout, completeIdentity }),
    [user, login, logout, completeIdentity],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
