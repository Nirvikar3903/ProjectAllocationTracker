import React from "react";

const Card = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-md ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-1">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;
