import axios from "axios";

const ADMIN_API_URL = "http://localhost:5000/api/v1/admin";
const ORDERS_API_URL = "http://localhost:5000/api/v1/orders";

const getToken = () => localStorage.getItem("adminToken");

export const fetchUsers = async () => {
    return axios.get(`${ADMIN_API_URL}/users`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const updateDeliveryStatus = async (id: string, status: string) => {
    return axios.patch(
        `${ORDERS_API_URL}/${id}`,
        { status },
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        }
    );
};
