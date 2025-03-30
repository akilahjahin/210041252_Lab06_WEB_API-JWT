import axios from "axios";

const API_URL = "http://localhost:4000/api/users";
const getToken = () => localStorage.getItem("token");

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/auth";  // Force redirect
        }
        return Promise.reject(error);
    }
);

export default api;