import Employee from "../models/Employee.js";

export const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (err) {
    res.status(500).json({ message: "Employee creation failed", error: err.message });
  }
};



export const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ message: "Employees fetched successfully", employees });
  } catch (err) {
    res.status(500).json({ message: "Employee fetching failed", error: err.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (err) {
    res.status(500).json({ message: "Employee update failed", error: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Employee deletion failed", error: err.message });
  }
};