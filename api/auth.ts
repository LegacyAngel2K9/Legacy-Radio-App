import { User } from '@/types';

// Simulated token storage
let authToken: string | null = null;
let currentUser: User | null = null;

// Mock authentication API
export const loginUser = async (username: string, password: string): Promise<{ token: string, user: User }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Very basic validation (in a real app, this would be server-side)
  if (!username || !password) {
    throw new Error('Username and password are required');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Simulate a successful authentication
  // In a real app, this would verify credentials against a backend
  const token = `mock_jwt_token_${Math.random().toString(36).substring(2)}`;
  
  // Create a user object based on the username
  const user: User = {
    id: `user_${Math.random().toString(36).substring(2)}`,
    username,
    rank: 'Member', // Default rank for new users
    status: 'online',
    serverId: null,
  };
  
  // Store the token and user
  authToken = token;
  currentUser = user;
  
  return { token, user };
};

export const registerUser = async (username: string, email: string, password: string): Promise<{ token: string, user: User }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Basic validation
  if (!username || !email || !password) {
    throw new Error('All fields are required');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Email format validation (simple check)
  if (!email.includes('@')) {
    throw new Error('Please enter a valid email address');
  }
  
  // Simulate a successful registration
  const token = `mock_jwt_token_${Math.random().toString(36).substring(2)}`;
  
  // Create a user object based on the username
  const user: User = {
    id: `user_${Math.random().toString(36).substring(2)}`,
    username,
    rank: 'Member', // Default rank for new users
    status: 'online',
    serverId: null,
  };
  
  // Store the token and user
  authToken = token;
  currentUser = user;
  
  return { token, user };
};

export const logoutUser = async (): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Clear the stored token and user
  authToken = null;
  currentUser = null;
};

export const getCurrentUser = async (): Promise<User | null> => {
  // In a real app, this would validate the stored token and fetch the current user
  // For this mock, we just return the stored user
  return currentUser;
};

export const isAuthenticated = (): boolean => {
  return !!authToken;
};