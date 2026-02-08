import { apiRequest } from '../config';

export const paymentAPI = {
  create: async (paymentData) => {
    return await apiRequest('/payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  getById: async (paymentId) => {
    return await apiRequest(`/payment/${paymentId}`, {
      method: 'GET',
    });
  },

  getByOrderId: async (orderId) => {
    return await apiRequest(`/payment/order/${orderId}`, {
      method: 'GET',
    });
  },

  updateStatus: async (paymentId, status) => {
    return await apiRequest(`/payment/${paymentId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};
