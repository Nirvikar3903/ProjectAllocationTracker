import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Project creation failed", error: err.message });
  }
};

export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ message: "Projects fetched successfully", projects });
  } catch (err) {
    res.status(500).json({ message: "Project fetching failed", error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Project fetching failed", error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Project updating failed", error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Project deletion failed", error: err.message });
  }
};
