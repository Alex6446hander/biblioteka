import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ label, variant = 'primary', isLoading, disabled, onClick }: ButtonProps) => {
  const variantClass = styles[variant];
  const disabledClass = disabled ? styles.disabled : "";
  const loadingClass = isLoading ? styles.loading : "";

  return (
    <button 
      className={`${styles.button} ${variantClass} ${disabledClass} ${loadingClass}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.01l-4-4h-1.841C6.805 9.636 7.34 14 9.701 16.564l6.121-6.121c1.36-1.36 1.36-3.563 0-4.923H21" />
          </svg>
          Ввод...
        </span>
      ) : label}
    </button>
  );
};

export default Button;
