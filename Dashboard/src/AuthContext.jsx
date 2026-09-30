import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  // ✅ Run on app load
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && isTokenValid(token)) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded); // ✅ ADD THIS

      setUser({
        id: decoded.id,
        email: decoded.email,
      });
    } else {
      logout(); // auto logout if expired
    }
  }, [logout]);

  // ✅ Login function
  const login = useCallback((userData) => {
    if (!userData || !userData.id) {
      throw new Error('User data must include the id property');
    }
    setUser(userData);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};