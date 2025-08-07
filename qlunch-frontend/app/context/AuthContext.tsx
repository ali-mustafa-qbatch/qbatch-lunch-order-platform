import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthState, AuthContextType } from '../types/global';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialState);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');

        if (token && username) {
            setState({
                isAuthenticated: true,
                user: { username },
                loading: false,
            });
        } else {
            setState({ ...initialState, loading: false });
        }
    }, []);

    const login = (username: string, tokens: { access_token: string; refresh_token: string }) => {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        localStorage.setItem('username', username);

        setState({
            isAuthenticated: true,
            user: { username },
            loading: false,
        });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');

        setState({
            isAuthenticated: false,
            user: null,
            loading: false,
        });
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}