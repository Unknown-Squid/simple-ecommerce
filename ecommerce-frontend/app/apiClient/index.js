// Main API client entry point
export { default as apiConfig, apiRequest, setAuthToken, removeAuthToken } from './config';
export { authAPI } from './Auth/authAPI';
export { productAPI } from './Product/productAPI';
export { orderAPI } from './Order/orderAPI';
export { paymentAPI } from './Payment/paymentAPI';
