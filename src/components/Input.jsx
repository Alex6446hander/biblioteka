import React, { useState } from "react";

const Input = ({ label, type = "text", placeholder, error, value, onChange, isPassword = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-2 border rounded-md transition-all duration-200 outline-none
            ${isFocused ? "border-blue-500 ring-1 ring-blue-200" : "border-gray-300"}
            ${error ? "border-red-500" : ""}
            ${value ? "bg-white" : "bg-white"}
          `}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "??" : "??"}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-1 text-red-500 text-xs">
          <span className="mr-1">??</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
