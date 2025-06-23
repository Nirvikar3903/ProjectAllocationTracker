import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Dashboards
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard";

// Pages
import UserProfile from "./pages/Profile/UserProfile";

// Employee CRUD
import EmployeeList from "./pages/Employees/EmployeeList";
import EmployeeForm from "./pages/Employees/EmployeeForm";
import EmployeeDetails from "./pages/Employees/EmployeeDetails";

// Project CRUD
import ProjectList from "./pages/Projects/ProjectList";
import ProjectForm from "./pages/Projects/ProjectForm";
import ProjectDetails from "./pages/Projects/ProjectDetails";

// Allocation CRUD
import AllocationList from "./pages/Allocations/AllocationList";
import AllocationForm from "./pages/Allocations/AllocationForm";
import AllocationDetails from "./pages/Allocations/AllocationDetails";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {!user ? (
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      ) : (
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              user.role === "Admin" ? <AdminDashboard /> : <EmployeeDashboard />
            }
          />
          <Route path="/profile" element={<UserProfile />} />

          {user.role === "Admin" && (
            <>
              {/* Employee CRUD */}
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/new" element={<EmployeeForm />} />
              <Route path="/employees/edit/:id" element={<EmployeeForm />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />

              {/* Project CRUD */}
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/new" element={<ProjectForm />} />
              <Route path="/projects/edit/:id" element={<ProjectForm />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />

              {/* Allocation CRUD */}
              <Route path="/allocations" element={<AllocationList />} />
              <Route path="/allocations/new" element={<AllocationForm />} />
              <Route path="/allocations/edit/:id" element={<AllocationForm />} />
              <Route path="/allocations/:id" element={<AllocationDetails />} />
            </>
          )}

          {user.role === "Employee" && (
            <Route path="*" element={<Navigate to="/dashboard" />} />
          )}
        </Route>
      )}
    </Routes>
  );
};

export default App;
