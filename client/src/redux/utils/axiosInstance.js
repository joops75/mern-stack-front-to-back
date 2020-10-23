import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/actionTypes';

const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // If unauthorized (invalid or no token), logout
    if (error.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
