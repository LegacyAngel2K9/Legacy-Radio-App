import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser, isAuthenticated } from '@/api/auth';
import { AuthState, User } from '@/types';

// Create the context with a default value
const AuthContext = createContext<AuthState>({
  isAuth: false,
  isLoading: true,
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setIsAuth(true);
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Check for temporary admin login
      if (username === 'admin' && password === 'admin') {
        const tempUser: User = {
          id: 'admin',
          username: 'Administrator',
          rank: 'Admin',
          status: 'online',
          serverId: null,
        };
        const tempToken = 'temp_admin_token';
        
        setToken(tempToken);
        setUser(tempUser);
        setIsAuth(true);
        return;
      }

      const { token, user } = await loginUser(username, password);
      setToken(token);
      setUser(user);
      setIsAuth(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token, user } = await registerUser(username, email, password);
      setToken(token);
      setUser(user);
      setIsAuth(true);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setToken(null);
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuth,
    isLoading,
    user,
    token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};