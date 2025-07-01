import axios from "axios";

/**
 * Configured axios instance to handle HTTP requests to the backend API.
 * Centralizes base URL, common headers, timeout, and response interceptors.
 */
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",

    headers: {
        "Content-Type": "application/json",
    },

    timeout: 10000,
});

/**
 * Global response interceptor to handle API errors consistently.
 * Differentiates between server errors, no response from server, and unexpected errors.
 */
axiosClient.interceptors.response.use(
    response => response, // Return response directly on success
    error => {
        if (error.response) {
            // Server responded with a status outside the 2xx range (4xx, 5xx)
            return Promise.reject(error);
        } else if (error.request) {
            // Request was made but no response received (e.g. timeout, server offline)
            return Promise.reject(new Error("Server did not respond."));
        } else {
            // Something went wrong in setting up the request
            return Promise.reject(new Error("Unexpected error occurred."));
        }
    }
);

export default axiosClient;
