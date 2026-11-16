import React from 'react';

const Advantages = () => {
  const items = [
    {
      title: "Контроль доступа",
      description: "Гибкое разграничение прав доступа для сотрудников и подразделений",
      icon: "👥"
    },
    {
      title: "Автоматизация",
      description: "Автоматическая архивация и удаление по срокам",
      icon: "⚙️"
    },
    {
      title: "Безопасность",
      description: "Надёжное хранение данных и прозрачность передачи документов и сведений",
      icon: "🛡️"
    },
    {
      title: "Журнал действий",
      description: "Полная история операций с документами для прозрачности и контроля",
      icon: "📄"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div key={index} className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="text-5xl mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
