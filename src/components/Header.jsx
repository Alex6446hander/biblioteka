import React from 'react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const Header = ({ onLogin, onRegister }) => {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-8 border-b border-border bg-background">
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight text-primary">СУД</span>
        <span className="text-xs text-muted-foreground">Система управления документами</span>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Привет, <span className="text-foreground">{user.name}</span>
            </span>
            <button 
              onClick={logout}
              className="text-sm font-medium text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-md transition-colors"
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button 
              onClick={onRegister}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Регистрация
            </button>
            <button 
              onClick={onLogin}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Войти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
