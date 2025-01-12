import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '@/firebaseConfig';  // Import your firebaseConfig
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import axios from "axios";  // Import axios

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component that will wrap the app and provide the auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // To store the authenticated user
    const [loading, setLoading] = useState(true);  // To manage loading state
    const [error, setError] = useState(null);  // To handle errors

    // Firebase onAuthStateChanged listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);  // Set loading to false once we know the auth state
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    // Send email and password to Django backend for registration or login
    const sendToBackend = async (email, password, isSignUp = false) => {
        try {
            const url = isSignUp
                ? 'http://192.168.1.2:8000/users/register/'  // URL for registration
                : 'http://192.168.1.2:8000/users/login/';   // URL for login

            const payload = { email, password };  // Send email and password

            // Debug: Log the payload and headers
            console.log('Sending request to backend with the following payload:', payload);

            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',  // Make sure to use raw JSON
                }
            });

            if (response.data.success) {
                console.log('User successfully authenticated or registered on Django');
            } else {
                console.log('Failed to authenticate user on Django');
            }
        } catch (error) {
            if (error.response) {
                // Print the error from the response to understand what's wrong
                console.error('Error response from backend:', error.response.data);
                setError(`Authentication failed: ${error.response.data.detail || error.response.data.error || error.response.data}`);
            } else if (error.request) {
                console.error('No response from backend:', error.request);
                setError('No response from backend.');
            } else {
                console.error('Error sending request:', error.message);
                setError('Request error occurred.');
            }
        }
    };

    // Sign in with email and password
    const signInWithEmail = async (email, password) => {
        setLoading(true);
        try {
            // Firebase sign-in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Now send email and password to Django backend for login
            await sendToBackend(email, password, false);  // false indicates login request

            setError(null);  // Clear any previous errors
        } catch (err) {
            setError(err.message);  // Set the error message
        } finally {
            setLoading(false);
        }
    };

    // Sign up with email and password
    const signUpWithEmail = async (email, password) => {
        setLoading(true);
        try {
            // Firebase sign-up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Now send email and password to Django backend for registration
            await sendToBackend(email, password, true);  // true indicates signup request

            setError(null);  // Clear any previous errors
        } catch (err) {
            setError(err.message);  // Set the error message
        } finally {
            setLoading(false);
        }
    };

    // Sign out the user
    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);  // Handle any sign-out error
        } finally {
            setLoading(false);
        }
    };

    // Pass auth state and methods as context value
    const value = {
        user,
        loading,
        error,
        signInWithEmail,
        signUpWithEmail,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
