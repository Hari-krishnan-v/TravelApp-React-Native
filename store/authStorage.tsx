// authStorage.js
import * as SecureStore from 'expo-secure-store';

// Store the auth token securely
export const setAuthToken = async (token) => {
    try {
        await SecureStore.setItemAsync('access_token', token); // Store token securely
    } catch (error) {
        console.error("Error storing token:", error);
    }
};

// Retrieve the auth token securely
export const getAuthToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('access_token');
        return token;
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null; // Return null if there's an error
    }
};

// Remove the auth token securely
export const removeAuthToken = async () => {
    try {
        await SecureStore.deleteItemAsync('access_token'); // Remove token securely
    } catch (error) {
        console.error("Error removing token:", error);
    }
};
