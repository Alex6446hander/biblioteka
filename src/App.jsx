import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen bg-white">
      {/* Простая навигация для переключения между страницами при разработке */}
      <nav className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50">
        <button 
          className="mr-2 px-2" 
          onClick={() => setCurrentPage('landing')}
        >
          Landing
        </button>
        <button 
          className="px-2" 
          onClick={() => setCurrentPage('login')}
        >
          Login
        </button>
      </nav>

      {currentPage === 'landing' ? <LandingPage /> : <LoginPage />}
    </div>
  );
};

export default App;
