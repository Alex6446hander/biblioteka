import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

const AppContent = ({ currentPage, setCurrentPage }) => {
  const { user } = useAuth();

  // Автоматический редирект на Dashboard после успешного входа
  useEffect(() => {
    if (user && currentPage === 'login') {
      setCurrentPage('dashboard');
    }
  }, [user, currentPage, setCurrentPage]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'login' && <LoginPage onRegisterSuccess={() => setCurrentPage('login')} />}
        {currentPage === 'register' && <RegisterPage onRegisterSuccess={() => setCurrentPage('login')} />}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'profile' && (
          <div className="container mx-auto py-20 text-center">
            <h1 className="text-3xl font-bold">Профиль пользователя</h1>
            <p className="text-muted-foreground mt-2">{user?.email}</p>
            <p className="text-sm text-muted-foreground">Роль: {user?.role}</p>
          </div>
        )}
      </main>

      {/* Navigation for development */}
      <nav className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50 flex gap-2">
        <button className="px-2 hover:text-blue-400" onClick={() => setCurrentPage('landing')}>Landing</button>
        {user ? (
          <>
            <button className="px-2 hover:text-blue-400" onClick={() => setCurrentPage('dashboard')}>Dash</button>
            <button className="px-2 hover:text-blue-400" onClick={() => setCurrentPage('profile')}>Profile</button>
          </>
        ) : (
          <>
            <button className="px-2 hover:text-blue-400" onClick={() => setCurrentPage('login')}>Login</button>
            <button className="px-2 hover:text-blue-400" onClick={() => setCurrentPage('register')}>Register</button>
          </>
        )}
      </nav>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <AuthProvider>
      <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </AuthProvider>
  );
};

export default App;
