import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ onSwitchToRegister }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">СУД</h1>
        <p className="text-muted-foreground">Система управления документами</p>
      </div>
      <LoginForm onSwitchToRegister={onSwitchToRegister} />
    </div>
  );
};

export default LoginPage;
