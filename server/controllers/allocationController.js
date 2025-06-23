// ✅ Refactored Allocation Controller
import Allocation from "../models/Allocation.js";

export const createAllocation = async (req, res) => {
  try {
    const allocation = new Allocation(req.body);
    await allocation.save();
    res.status(201).json({ message: "Allocation created successfully", allocation });
  } catch (err) {
    res.status(500).json({ message: "Allocation creation failed", error: err.message });
  }
};

export const getAllAllocation = async (req, res) => {
  try {
    const allocations = await Allocation.find().populate("employee project");
    res.status(200).json({ message: "Allocations fetched successfully", allocations });
  } catch (err) {
    res.status(500).json({ message: "Allocation fetching failed", error: err.message });
  }
};

export const getAllocationById = async (req, res) => {
  try {
    const allocation = await Allocation.findById(req.params.id).populate("employee project");
    if (!allocation) return res.status(404).json({ error: "Allocation not found" });
    res.status(200).json(allocation);
  } catch (err) {
    res.status(500).json({ message: "Allocation fetching failed", error: err.message });
  }
};

export const updateAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!allocation) return res.status(404).json({ error: "Allocation not found" });
    res.status(200).json({ message: "Allocation updated successfully", allocation });
  } catch (err) {
    res.status(500).json({ message: "Allocation updating failed", error: err.message });
  }
};

export const deleteAllocation = async (req, res) => {
  try {
    const allocation = await Allocation.findByIdAndDelete(req.params.id);
    if (!allocation) return res.status(404).json({ error: "Allocation not found" });
    res.status(200).json({ message: "Allocation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Allocation deletion failed", error: err.message });
  }
};