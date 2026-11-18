import React, { useState } from 'react';
import { cn } from '../lib/utils';
import Input from './Input';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card border border-border rounded-xl shadow-sm space-y-6">
      <div className="flex border-b border-border">
        <button 
          className={cn(
            "flex-1 py-2 text-sm font-medium transition-colors",
            activeTab === 'login' ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab('login')}
        >
          Войти
        </button>
        <button 
          className={cn(
            "flex-1 py-2 text-sm font-medium transition-colors",
            activeTab === 'register' ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab('register')}
        >
          Регистрация
        </button>
      </div >

      <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Логин
          </label>
          <Input 
            type="text" 
            placeholder="Введите логин"
          />
        </div >
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Пароль
          </label>
          <Input 
            type="password" 
            placeholder="Введите пароль"
          />
        </div >
        <button className="w-full inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
          {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {activeTab === 'login' ? "Нет аккаунта? " : "Уже есть аккаунт? "}
        <button className="text-primary hover:underline font-medium">
          {activeTab === 'login' ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>
    </div >
  );
};

export default LoginForm;
