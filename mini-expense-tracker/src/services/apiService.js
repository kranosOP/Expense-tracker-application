import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend ka base URL

// 🟢 User Registration API Call
// export const registerUser = async (formData) => {
//     try {
//         const response = await axios.post(`${API_URL}/register`, formData);
//         return response.data;
//     } catch (error) {
//         console.error("Registration Failed", error.response?.data || error.message);
//         throw error.response?.data || { message: "Registration failed! Try again." };
//     }
// };

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData);
        console.log("Registration Success:", response.data);
        return response.data;
    } catch (error) {
        console.error("Registration Failed:", error.response?.data || error.message);
        throw error.response?.data || { message: "Registration failed! Try again." };
    }
};


// 🟢 User Login API Call
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        localStorage.setItem("token", response.data.token); // Save token
        return response.data;
    } catch (error) {
        console.error("Login Failed", error.response?.data || error.message);
        throw error;
    }
};

// 🟢 Expenses Fetch API Call
export const getExpenses = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found!");

        const response = await axios.get(`${API_URL}/expenses`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error Fetching Expenses", error.response?.data || error.message);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");  // 🔹 Remove token from localStorage
};