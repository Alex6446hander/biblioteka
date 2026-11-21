import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        onLogin={() => setCurrentPage('login')} 
        onRegister={() => setCurrentPage('register')} 
      />
      
      <main className="flex-grow">
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
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <AuthProvider>
      <LibraryProvider>
        <AppContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </LibraryProvider>
    </AuthProvider>
  );
};

export default App;
