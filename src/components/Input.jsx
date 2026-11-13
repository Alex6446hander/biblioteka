import React, { useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  label?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
}

const Input = ({ label, type = 'text', placeholder, error, value, onChange, isPassword = false }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.relativeContainer}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${styles.baseInput} ${isFocused ? styles.inputFocused : styles.inputDefault} ${error ? styles.inputError : ''} ${value ? styles.inputBgWhite : styles.inputBgWhite}`}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.passwordButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁' : '🙈'}
          </button>
        )}
      </div >
      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.warningIcon}>⚠️</span>
          <span>{error}</span>
        </div >
      )}
    </div >
  );
};

export default Input;
