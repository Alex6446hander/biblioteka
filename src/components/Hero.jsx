import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className="md:w-1/2 space-y-6">
        <h1 className={styles.title}>
          Система управления документами
        </h1>
        <p className={styles.description}>
          Надёжное хранение документов, контроль доступа и умная архивация.
        </p>
        <ul className="space-y-3">
          {[
            "Упорядоченный учёт документов",
            "Разграниченная передача прав доступа",
            "Автоматическая архивация и удаление по срокам"
          ].map((text, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4-4m0 0l4-4m-4 4h12" />
              </svg>
              {text}
            </li>
          ))}
        </ul >
        <button className={styles.buttonPrimary}>
          Войти в систему
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5-5m0 0l5 5m-5-5H6" />
          </svg>
        </button>
      </div >
      
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <div className={styles.visualPlaceholder}>
          <span className="text-blue-300 text-xl">Визуализация системы</span>
        </div >
      </div >
    </section>
  );
};

export default Hero;
