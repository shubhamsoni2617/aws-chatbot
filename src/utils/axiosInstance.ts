import axios from "axios";
import { getLocalData, setLocalData } from "../utils/localStorage";
import API from "@/services/api";

// State to track token refresh
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Notify all subscribers with the new token
const notifySubscribers = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Add a new subscriber to the list
const addSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Handle user logout and redirect to login
const handleLogout = () => {
  setLocalData("token", null);
  // Clear any other relevant storage data
  localStorage.clear();
  
  // Only redirect if we're not already on the login page
  // if(window.location.pathname ===)
  if (window.location.pathname !== "/" && window.location.pathname !=="/forgot-password") {
  // if (window.location.pathname !== "/") {

    window.location.replace("/");
  }
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API.base_url,
  headers: {
    Accept: "application/json",
  },
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = getLocalData("token")?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const status = response?.status;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const tokenData = getLocalData("token");
          
          // Check if we have both tokens
          if (!tokenData || !tokenData.refresh_token) {
            // console.log("No valid tokens found, redirecting to login");
            handleLogout();
            return Promise.reject(new Error("Authentication required"));
          }

          const { data: newTokenData } = await axios.post(API.refresh_token, {
            refresh_token: tokenData.refresh_token,
          });

          // Validate the new token data
          if (!newTokenData || !newTokenData.access_token) {
            throw new Error("Invalid token response");
          }

          // Save the new token and update headers
          setLocalData("token", newTokenData);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newTokenData.access_token}`;
          originalRequest.headers.Authorization = `Bearer ${newTokenData.access_token}`;

          // Notify all subscribers with the new token
          notifySubscribers(newTokenData.access_token);
          isRefreshing = false;

          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("Token refresh failed:", err);
          isRefreshing = false;
          handleLogout();
          return Promise.reject(new Error("Authentication failed"));
        }
      }

      // Wait for the token refresh to complete
      return new Promise((resolve) => {
        addSubscriber((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

