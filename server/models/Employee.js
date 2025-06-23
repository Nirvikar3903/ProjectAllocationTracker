import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  role: {
    type: String,
    default: "Employee",
    enum: ["Employee", "Manager", "Intern"]
  },
  department: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
