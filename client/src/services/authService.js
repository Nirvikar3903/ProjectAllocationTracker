import API from "./api";

export const loginUser = (credentials) => API.post("/api/auth/login", credentials);
export const registerUser = (formData) => API.post("/api/auth/register", formData);
