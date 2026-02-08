import { apiRequest } from '../config';

export const productAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `/store/products${queryParams ? `?${queryParams}` : ''}`;
    return await apiRequest(endpoint, {
      method: 'GET',
    });
  },

  getById: async (productId) => {
    return await apiRequest(`/store/products/${productId}`, {
      method: 'GET',
    });
  },

  create: async (productData) => {
    return await apiRequest('/store/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  update: async (productId, productData) => {
    return await apiRequest(`/store/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  delete: async (productId) => {
    return await apiRequest(`/store/products/${productId}`, {
      method: 'DELETE',
    });
  },
};
