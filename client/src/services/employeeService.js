import API from "./api";

export const getAllEmployees = () => API.get("/api/employees").then(res => res.data);
export const getEmployeeById = (id) => API.get(`/api/employees/${id}`).then(res => res.data);
export const createEmployee = (data) => API.post("/api/employees", data);
export const updateEmployee = (id, data) => API.put(`/api/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/api/employees/${id}`);
