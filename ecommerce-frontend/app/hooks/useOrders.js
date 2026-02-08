'use client';

import { useState, useEffect, useCallback } from 'react';
import { orderAPI } from '@/app/apiClient/Order/orderAPI';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderAPI.getAll();
      if (response.success) {
        setOrders(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const refetch = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    refetch,
  };
};

export const useOrder = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await orderAPI.getById(orderId);
      if (response.success) {
        setOrder(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch order');
      }
    } catch (err) {
      setError(err.message);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return {
    order,
    loading,
    error,
    refetch: fetchOrder,
  };
};

export const useOrderMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderAPI.create(orderData);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to create order');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderAPI.updateStatus(orderId, status);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to update order status');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createOrder,
    updateOrderStatus,
    loading,
    error,
  };
};
