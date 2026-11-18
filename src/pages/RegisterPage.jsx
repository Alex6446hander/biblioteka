import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Note: We'll need to add react-router-dom if not present, or use simple state as in App.jsx
import { cn } from '../lib/utils';
import Input from '../components/Input';

const RegisterPage = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    // Mock registration
    onRegisterSuccess(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-xl border border-border shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Создать аккаунт</h1>
          <p className="text-muted-foreground">Зарегистрируйтесь, чтобы начать работу</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Input 
              label="Полное имя"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Input 
              label="Email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Input 
              label="Пароль"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button 
            type="submit"
            className="w-full inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Уже есть аккаунт? </span>
          <button className="text-primary hover:underline font-medium">
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
