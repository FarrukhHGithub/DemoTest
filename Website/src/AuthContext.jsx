import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");
    const clientId = localStorage.getItem("clientId");

    if (token && loginTime && clientId) {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (now - loginTime > oneDay) {
        // ❌ Expired → logout
        localStorage.removeItem("token");
        localStorage.removeItem("clientId");
        localStorage.removeItem("loginTime");

        window.location.href = "/login";
      } else {
        // ✅ Still valid → restore user
        setUser({ clientId });
      }
    }
  }, []);

  const authValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;