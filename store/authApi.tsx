import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.2:8000/';   // Update with your backend URL

// Login user and return the access token
export const loginUserApi = async (email, password) => {
    try {
        console.log(email, password)
        const response = await axios.post(`${API_URL}users/login/`, { email, password });
        const { access, refresh } = response.data;
        // Store tokens securely
        await SecureStore.setItemAsync('access_token', access);
        await SecureStore.setItemAsync('refresh_token', refresh);
        return access;  // Return the access token
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

// Logout user and clear tokens
export const logoutUserApi = async () => {
    try {
        await axios.post(`${API_URL}logout/`);
        // Clear tokens on logout
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
    } catch (error) {
        throw new Error('Logout failed. Please try again.');
    }
};

// Register user (Signup)
// @ts-ignore
export const registerUserApi = async (email, password) => {
    try {
        // Corrected URL: Do not append `users/register/` twice
        const response = await axios.post(
            `${API_URL}users/register/`, // Only one instance of `users/register/`
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',  // Ensure this is application/json
                },
            }
        );

        const { access, refresh } = response.data;

        // Store tokens securely
        await SecureStore.setItemAsync('access_token', access);
        await SecureStore.setItemAsync('refresh_token', refresh);

        return access;  // Return access token
    } catch (error) {
        // Log the error details
        if (error.response) {
            // The server responded with a status code other than 2xx
            console.error("Server error:", error.response.data);
            alert("Error: " + JSON.stringify(error.response.data));
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request error:", error.request);
            alert("Request error: " + JSON.stringify(error.request));
        } else {
            // Something else went wrong
            console.error("Error message:", error.message);
            alert("Error: " + error.message);
        }

        throw new Error('Registration failed. Please try again.');
    }
};