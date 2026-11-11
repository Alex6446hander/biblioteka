import React, { useState } from 'react';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="max-w-md mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex border-b mb-6">
        <button 
          className={`flex-1 py-2 ${activeTab === 'login' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('login')}
        >
          Войти
        </button>
        <button 
          className={`flex-1 py-2 ${activeTab === 'register' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('register')}
        >
          Регистрация
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Логин</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded mt-1" 
            placeholder="Введите логин"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Пароль</label>
          <div className="relative">
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded mt-1" 
              placeholder="Введите пароль"
            />
            <span className="absolute right-2 top-2 text-gray-400">👁</span>
          </div>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {activeTab === 'login' ? "Нет аккаунта? " : "Уже есть аккаунт? "}
        <button className="text-blue-600 hover:underline">
          {activeTab === 'login' ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
