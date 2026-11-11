import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">СУД</h1>
        <p className="text-gray-600">Система управления документами</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
