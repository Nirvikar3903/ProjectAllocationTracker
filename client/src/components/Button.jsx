import React from "react";

const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const baseStyle =
    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button onClick={onClick} type={type} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;

