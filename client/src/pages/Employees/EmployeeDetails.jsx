import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEmployeeById,
  deleteEmployee,
} from "../../services/employeeService";
import Button from "../../components/Button";
import Card from "../../components/Card";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById(id).then(setEmployee);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this employee?")) {
      await deleteEmployee(id);
      navigate("/employees");
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card title={employee.name} subtitle={employee.department}>
        <p className="mb-2 text-sm text-gray-600">Email: {employee.email}</p>
        <p className="mb-2 text-sm text-gray-600">Role: {employee.role}</p>
        <p className="mb-2 text-sm text-gray-600">
          Skills: {employee.skills?.join(", ") || "None"}
        </p>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => navigate(`/employees/edit/${id}`)} variant="primary">
            Edit
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmployeeDetails;
