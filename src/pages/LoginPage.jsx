import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterPage from '../pages/RegisterPage';

const LoginPage = () => {
  const [view, setView] = useState('login');

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      {view === 'login' ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">СУД</h1>
            <p className="text-muted-foreground">Система управления документами</p>
          </div>
          <LoginForm onSwitchToRegister={() => setView('register')} />
        </>
      ) : (
        <RegisterPage onRegisterSuccess={() => setView('login')} />
      )}
    </div>
  );
};

export default LoginPage;
