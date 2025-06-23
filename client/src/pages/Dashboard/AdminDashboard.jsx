import React from "react";
import Card from "../../components/Card";
import { useAuth } from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || "Admin"}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Employees" subtitle="Manage all employee records here" />
        <Card title="Projects" subtitle="Track project status and team members" />
        <Card title="Allocations" subtitle="View and assign employees to projects" />
      </div>
    </div>
  );
};

export default AdminDashboard;

