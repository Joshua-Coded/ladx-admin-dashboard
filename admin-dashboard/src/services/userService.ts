import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api/v1/users';

// Fetch all senders
export const fetchSenders = async () => {
    const response = await axios.get(`${API_BASE_URL}/senders`);
    return response.data;
};

// Fetch all travelers
export const fetchTravelers = async () => {
    const response = await axios.get(`${API_BASE_URL}/travelers`);
    return response.data;
};
