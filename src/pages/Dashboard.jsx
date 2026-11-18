import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, Folder, Bell, User } from 'lucide-react';
import { cn } from '../lib/utils';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Всего документов', value: '124', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'В шкафах', value: '48', icon: Folder, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Ожидают проверки', value: '12', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Панель управления</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Добро пожаловать, {user?.name}!</h2>
          <p className="text-muted-foreground">Ваша сводка за сегодня</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-card shadow-sm flex items-center gap-4">
              <div className={cn("p-3 rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm">Новый документ</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                <Folder className="h-8 w-8 mb-2 text-primary" />
                <span className="text-sm">Создать шкаф</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-4">Последние события</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Документ "Договор №{i}" был обновлен</p>
                    <p className="text-muted-foreground text-xs">2 часа назад</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
