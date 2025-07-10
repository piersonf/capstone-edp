import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Creating an authentication context
const AuthContext = createContext({});

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (employee_id, password) => {
        try {
            console.log('Logging in with:', employee_id, password);
            const response = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ employee_id, password }),
            });
            const data = await response.json();
            if (data.message === 'Login successful') {
                console.log('Login successful:', data);
                setUser(data); // Set user data in state
                localStorage.setItem('user_id', JSON.stringify(data)); // Store user ID in local storage
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user_id'); // Remove user ID from local storage
        setUser(null); // In real scenarios, you might want to invalidate the session on the server as well
        navigate('/'); // Redirect to the search page after login
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);