import axios from 'axios';
import { User } from '../types/User';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  preferences?: any;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user data');
    }
  }

  async googleLogin(tokenId: string): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/google', { tokenId });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

export default new AuthService();