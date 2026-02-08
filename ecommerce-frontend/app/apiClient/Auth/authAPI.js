import { apiRequest, setAuthToken, removeAuthToken } from '../config';

export const authAPI = {
  register: async (userData) => {
    const response = await apiRequest('/account/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  },

  login: async (email, password) => {
    const response = await apiRequest('/account/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.data.token) {
      setAuthToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', response.data.user.email);
      }
    }
    
    return response;
  },

  logout: () => {
    removeAuthToken();
  },

  getProfile: async () => {
    return await apiRequest('/account/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (userData) => {
    return await apiRequest('/account/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};
