import React from 'react';
import { Users, Settings, Shield, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const Advantages = () => {
  const items = [
    {
      title: "Контроль доступа",
      description: "Гибкое разграничение прав доступа для сотрудников и подразделений",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Автоматизация",
      description: "Автоматическая архивация и удаление по срокам",
      icon: Settings,
      color: "text-orange-500"
    },
    {
      title: "Безопасность",
      description: "Надёжное хранение данных и прозрачность передачи документов и сведений",
      icon: Shield,
      color: "text-green-500"
    },
    {
      title: "Журнал действий",
      description: "Полная история операций с документами для прозрачности и контроля",
      icon: FileText,
      color: "text-purple-500"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              )}
            >
              <div className={cn("p-3 rounded-lg mb-4", item.color.replace('text', 'bg').replace('500', '50/10'))}>
                <item.icon className={cn("w-8 h-8", item.color)} />
              </div>
              <h3 className="text-lg font-semibold leading-tight mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
