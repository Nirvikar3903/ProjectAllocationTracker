import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../services/employeeService";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Failed to load employees", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link
          to="/employees/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Employee
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <Card
            key={emp._id}
            title={emp.name}
            subtitle={emp.department}
            className="cursor-pointer"
          >
            <p className="text-sm">{emp.role}</p>
            <Link
              to={`/employees/${emp._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;

