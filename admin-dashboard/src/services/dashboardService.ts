import axios from "axios";

const API_BASE_URL = 'https://ladx.onrender.com/api/v1/dashboard';

// Fetch the number of travelers
export const fetchTravelersCount = async (): Promise<number> => {
    const response = await axios.get(`${API_BASE_URL}/travel-plans/count`);
    return response.data.count;
};

// Fetch the number of senders
export const fetchSendersCount = async (): Promise<number> => {
    const response = await axios.get(`${API_BASE_URL}/users/count?role=sender`);
    return response.data.count;
};

// Fetch the total number of packages delivered
export const fetchPackagesDeliveredCount = async (): Promise<number> => {
    const response = await axios.get(`${API_BASE_URL}/orders/delivered/count`);
    return response.data.count;
};
