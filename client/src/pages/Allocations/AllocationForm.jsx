import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAllocation,
  updateAllocation,
  getAllocationById,
} from "../../services/allocationService";
import { getAllEmployees } from "../../services/employeeService";
import { getAllProjects } from "../../services/projectService";
import Button from "../../components/Button";

const AllocationForm = () => {
  const [form, setForm] = useState({ employee: "", project: "", percentage: "" });
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOptions = async () => {
      const emp = await getAllEmployees();
      const proj = await getAllProjects();
      setEmployees(emp);
      setProjects(proj);
    };
    fetchOptions();

    if (id) {
      getAllocationById(id).then((data) => {
        setForm({
          employee: data.employee._id,
          project: data.project._id,
          percentage: data.percentage,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      id ? await updateAllocation(id, form) : await createAllocation(form);
      navigate("/allocations");
    } catch (err) {
      console.error("Error saving allocation", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Allocation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="employee"
          value={form.employee}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        <select
          name="project"
          value={form.project}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
          required
        >
          <option value="">Select Project</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>
              {proj.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="percentage"
          placeholder="Allocation Percentage"
          value={form.percentage}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
          min="1"
          max="100"
          required
        />

        <Button type="submit" variant="primary">
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default AllocationForm;
