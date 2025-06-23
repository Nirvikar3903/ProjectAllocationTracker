import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";
import Button from "../../components/Button";

const EmployeeForm = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "Employee", department: "", skills: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((data) => {
        setForm({
          ...data,
          skills: data.skills.join(", "),
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
    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    };
    try {
      id ? await updateEmployee(id, payload) : await createEmployee(payload);
      navigate("/employees");
    } catch (err) {
      console.error("Error saving employee", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded-xl"
        >
          <option value="Employee">Employee</option>
          <option value="Intern">Intern</option>
          <option value="Manager">Manager</option>
        </select>

        <Button type="submit" variant="primary">
          {loading ? "Saving..." : id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default EmployeeForm;
