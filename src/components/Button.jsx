import React from "react";

const Button = ({ label, variant = "primary", isLoading, disabled, onClick }) => {
  const baseStyles = "px-6 py-2 rounded font-medium transition-all duration-200 flex items-center justify-center";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-95"
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  const loadingStyles = isLoading ? "cursor-wait" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${loadingStyles}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.01l-4-4h-1.841C6.805 9.636 7.34 14 9.701 16.564l6.121-6.121c1.36-1.36 1.36-3.563 0-4.923H21" />
          </svg>
          ¬вод...
        </span>
      ) : label}
    </button>
  );
};

export default Button;
