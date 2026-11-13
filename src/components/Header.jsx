import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <span className={styles.logoText}>СУД</span>
        <span className={styles.subLogoText}>
          Система управления документами
        </span>
      </div >
      <div className={styles.navActions}>
        <button className={styles.navButton}>
          Регистрация
        </button>
        <button className={styles.navButtonPrimary}>
          Войти
        </button>
      </div >
    </header>
  );
};

export default Header;
