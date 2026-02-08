'use client';

import { useState, useCallback } from 'react';
import { paymentAPI } from '@/app/apiClient/Payment/paymentAPI';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = useCallback(async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentAPI.create(paymentData);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to create payment');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const getPayment = useCallback(async (paymentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentAPI.getById(paymentId);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to fetch payment');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaymentsByOrder = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentAPI.getByOrderId(orderId);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to fetch payments');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePaymentStatus = useCallback(async (paymentId, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentAPI.updateStatus(paymentId, status);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to update payment status');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createPayment,
    getPayment,
    getPaymentsByOrder,
    updatePaymentStatus,
    loading,
    error,
  };
};
