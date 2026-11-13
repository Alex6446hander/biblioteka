import React from 'react';
import styles from './Advantages.module.css';

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
    <section className={styles.advantagesSection}>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className="text-5xl mb-6">{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
