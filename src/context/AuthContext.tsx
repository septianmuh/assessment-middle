"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export interface User {
    id: string;
    email: string;
    fullname: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    saveHistory: (token: string | null, user: User | null) => void;
    logout: () => void;
}

let initialState: AuthContextType = {
    token: null,
    user: null,
    saveHistory: (token: string | null, user: User | null) => {},
    logout: () => {},
}

const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser ?? '{}'));
        }
    }, []);

    const saveHistory = (token: string | null, user: User | null) => {
        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={useMemo(() => ({ token, user, saveHistory, logout }), [token, user])}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
