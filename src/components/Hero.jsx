import React from 'react';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Система управления документами
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-lg">
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
        </ul>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
          Войти в систему
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5-5m0 0l5 5m-5-5H6" />
          </svg>
        </button>
      </div>
      
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <div className="w-full h-80 bg-blue-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-200">
          <span className="text-blue-300 text-xl">Визуализация системы</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
