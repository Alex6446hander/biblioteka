import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import Input from './Input';

const LoginForm = ({ onSwitchToRegister }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card border border-border rounded-xl shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Войти</h2>
        <p className="text-sm text-muted-foreground">Введите свои данные для доступа к системе</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input 
            label="Email"
            type="email" 
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Input 
            label="Пароль"
            type="password" 
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Нет аккаунта? </span>
        <button 
          onClick={onSwitchToRegister}
          className="text-primary hover:underline font-medium"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
