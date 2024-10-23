// AuthContext.js
import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkUserValidity = () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000; // Current time in seconds

                    // Check if the token has expired
                    if (decodedToken.exp < currentTime) {
                        // Token expired
                        localStorage.removeItem('token');
                        setUser(null);
                    } else {
                        // Token is valid
                        setUser(decodedToken);
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        }
        checkUserValidity();
    }, [location]);

    // Sign out function
    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');

        if (token) { // Need to check if token still valid
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Current time in seconds

            // Check if the token has expired
            if (decodedToken.exp < currentTime) {
                // Token expired
                localStorage.removeItem('token');
                return false
            } else {
                // Token is valid
                return true
            }
        } else { 
            // No token means user not signed in
            return false
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, signOut, checkTokenValidity}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
