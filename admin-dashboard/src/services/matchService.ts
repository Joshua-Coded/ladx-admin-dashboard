import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1/admin";
const BASE_URL = "http://localhost:5000/api/v1";

// Helper function to get the admin token
const getAdminToken = (): string | null => {
    return localStorage.getItem("adminToken"); // Replace this with your actual token storage method
};

// Configure Axios instance with Authorization Header
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAdminToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("Admin token is missing!");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log errors globally
        console.error("API call failed:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Fetch all orders
export const fetchOrders = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/orders`);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch orders:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch a specific order by ID
export const fetchOrderById = async (orderId: string) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/orders/${orderId}`);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch order by ID:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch all travel plans
export const fetchTravelPlans = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/travel-plans`);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch travel plans:", error.response?.data || error.message);
        throw error;
    }
};

// Match an order with a travel plan
export const matchOrderWithTravelPlan = async (orderId: string, travelPlanId: string) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/match`, {
            orderId,
            travelPlanId,
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to match order with travel plan:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch travel plan details by ID
export const fetchTravelPlanDetails = async (travelPlanId: string) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/travel-plans/${travelPlanId}`);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch travel plan details:", error.response?.data || error.message);
        throw error;
    }
};
