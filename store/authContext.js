import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebaseConfig';  // Import your firebaseConfig
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component that will wrap the app and provide the auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // To store the authenticated user
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // To handle errors

    // Firebase onAuthStateChanged listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // If there's a logged-in user, update the user state
            } else {
                setUser(null); // If not, set user to null
            }
            setLoading(false); // Set loading to false once we know the auth state
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    // Sign in with email and password
    const signInWithEmail = async (email, password) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);

            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message); // Set the error message
        } finally {
            setLoading(false);
        }
    };

    // Sign up with email and password
    const signUpWithEmail = async (email, password) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message); // Set the error message
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
            setError(err.message); // Handle any sign-out error
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
