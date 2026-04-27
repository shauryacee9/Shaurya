import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface Profile {
  _id: string;
  profileName: string;
  avatar: string;
  isKidsProfile: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  selectedProfile: Profile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  selectProfile: (profile: Profile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(
    JSON.parse(localStorage.getItem('selectedProfile') || 'null')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token, ...userData } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
  };

  const signup = async (name: string, email: string, password: string, role: string = 'user') => {
    const response = await axios.post('/api/auth/signup', { name, email, password, role });
    const { token, ...userData } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('selectedProfile');
    setToken(null);
    setUser(null);
    setSelectedProfile(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const selectProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider value={{ user, token, selectedProfile, loading, login, signup, logout, selectProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
