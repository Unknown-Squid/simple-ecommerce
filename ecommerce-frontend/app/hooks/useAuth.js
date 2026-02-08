'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/app/apiClient/Auth/authAPI';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Registration failed');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        router.push('/dashboard');
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Login failed');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    authAPI.logout();
    router.push('/');
  }, [router]);

  const getProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.getProfile();
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to fetch profile');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.updateProfile(userData);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to update profile');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    loading,
    error,
  };
};
