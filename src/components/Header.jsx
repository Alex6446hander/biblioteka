import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-4 px-8 border-b border-gray-100 flex justify-between items-center bg-white">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-blue-600">СУД</span>
        <span className="text-sm text-gray-500 border-l pl-2 ml-2">
          Система управления документами
        </span>
      </div>
      <div className="flex space-x-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
          Регистрация
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Войти
        </button>
      </div>
    </header>
  );
};

export default Header;
