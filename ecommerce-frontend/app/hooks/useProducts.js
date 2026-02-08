'use client';

import { useState, useEffect, useCallback } from 'react';
import { productAPI } from '@/app/apiClient/Product/productAPI';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getAll(filters);
      if (response.success) {
        setProducts(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch,
  };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getById(productId);
      if (response.success) {
        setProduct(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch product');
      }
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};

export const useProductMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.create(productData);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to create product');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (productId, productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.update(productId, productData);
      if (response.success) {
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Failed to update product');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.delete(productId);
      if (response.success) {
        return { success: true };
      }
      throw new Error(response.message || 'Failed to delete product');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
  };
};
