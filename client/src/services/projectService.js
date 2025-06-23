import API from "./api";

export const getAllProjects = () => API.get("/api/projects").then(res => res.data);
export const getProjectById = (id) => API.get(`/api/projects/${id}`).then(res => res.data);
export const createProject = (data) => API.post("/api/projects", data);
export const updateProject = (id, data) => API.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);
