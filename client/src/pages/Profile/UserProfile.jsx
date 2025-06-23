import React from "react";
import { useAuth } from "../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white rounded-xl shadow p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;

