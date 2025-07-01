import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            return Promise.reject(error);
        } else if (error.request) {
            return Promise.reject(new Error("Servidor não respondeu."));
        } else {
            return Promise.reject(new Error("Erro inesperado."));
        }
    }
);

export default axiosClient;
