import API from "./api";

export const getAllAllocations = () => API.get("/api/allocations").then(res => res.data);
export const getAllocationById = (id) => API.get(`/api/allocations/${id}`).then(res => res.data);
export const getAllocationsForEmployee = (empId) =>
  API.get(`/api/allocations/employee/${empId}`).then(res => res.data);
export const createAllocation = (data) => API.post("/api/allocations", data);
export const updateAllocation = (id, data) => API.put(`/api/allocations/${id}`, data);
export const deleteAllocation = (id) => API.delete(`/api/allocations/${id}`);
