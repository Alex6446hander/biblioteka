import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import Input from './Input';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'login' ? styles.activeTab : styles.inactiveTab}`}
          onClick={() => setActiveTab('login')}
        >
          Войти
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'register' ? styles.activeTab : styles.inactiveTab}`}
          onClick={() => setActiveTab('register')}
        >
          Регистрация
        </button>
      </div >

      <form className={styles.form}>
        <div>
          <label className={styles.label}>Логин</label>
          <Input 
            type="text" 
            placeholder="Введите логин"
          />
        </div >
        <div>
          <label className={styles.label}>Пароль</label>
          <Input 
            type="password" 
            placeholder="Введите пароль"
          />
        </div >
        <button className={styles.submitButton}>
          {activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <p className={styles.footerText}>
        {activeTab === 'login' ? "Нет аккаунта? " : "Уже есть аккаунт? "}
        <button className={styles.link}>
          {activeTab === 'login' ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>
    </div >
  );
};

export default LoginForm;
