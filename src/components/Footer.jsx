import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerText}>
          СУД — Система управления документами
        </div >
        <div className={styles.footerText}>
          2024
        </div >
      </div >
    </footer >
  );
};

export default Footer;
