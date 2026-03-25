import axios from "axios";

// Dynamic API base URL for different environments
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production, use the same domain for API calls
    return '/api';
  } else {
    // In development, use localhost
    return 'http://localhost:8000';
  }
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
