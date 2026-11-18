import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Mock user: { name: 'Admin', role: 'admin', email: 'admin@example.com' }
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    // Mocking API call
    setTimeout(() => {
      setUser({ id: 1, name: 'Александр', email, role: 'admin' });
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ id: 2, name: userData.name, email: userData.email, role: 'user' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
