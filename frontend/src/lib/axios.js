import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    withCredentials: true,
})

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`📡 Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("📡 Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`📡 Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("📡 Axios Error:", {
      message: error.message,
      code: error.code,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : "❌ NO RESPONSE (Server might be down)",
      request: error.request ? "Request was made but no response" : "No request was made",
      url: error.config?.baseURL + error.config?.url
    });
    return Promise.reject(error);
  }
);