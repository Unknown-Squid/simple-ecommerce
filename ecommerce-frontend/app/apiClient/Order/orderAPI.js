import { apiRequest } from '../config';

export const orderAPI = {
  create: async (orderData) => {
    return await apiRequest('/store/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return await apiRequest('/store/orders', {
      method: 'GET',
    });
  },

  getById: async (orderId) => {
    return await apiRequest(`/store/orders/${orderId}`, {
      method: 'GET',
    });
  },

  updateStatus: async (orderId, status) => {
    return await apiRequest(`/store/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};
