import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, loginRequest, logoutRequest, registerRequest } from '../api/auth';
import type { LoginPayload, RegisterPayload, User } from '../types';

interface AuthContextValue {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (token) {
        try {
          const profile = await getCurrentUser(token);
          setUser(profile);
        } catch (error) {
          console.error('Failed to load profile', error);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    bootstrap();
  }, [token]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      setLoading(true);
      try {
        const { token: authToken, user: loggedUser } = await loginRequest(payload);
        setToken(authToken);
        setUser(loggedUser);
        localStorage.setItem('token', authToken);
        navigate(loggedUser.roles.includes('admin') ? '/admin' : '/app');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setLoading(true);
      try {
        const { token: authToken, user: registeredUser } = await registerRequest(payload);
        setToken(authToken);
        setUser(registeredUser);
        localStorage.setItem('token', authToken);
        navigate('/app');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      await logoutRequest(token);
    } catch (error) {
      console.warn('Failed to call logout endpoint', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      setLoading(false);
      navigate('/');
    }
  }, [navigate, token]);

  const refreshProfile = useCallback(async () => {
    if (!token) return;
    try {
      const profile = await getCurrentUser(token);
      setUser(profile);
    } catch (error) {
      console.error('Failed to refresh profile', error);
    }
  }, [token]);

  const value = useMemo(
    () => ({ token, user, loading, login, register, logout, refreshProfile }),
    [token, user, loading, login, register, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
