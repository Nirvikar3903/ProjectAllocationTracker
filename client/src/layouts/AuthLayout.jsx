import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 transition-all duration-300 ease-in-out">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Resource Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Please log in or sign up.</p>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
      