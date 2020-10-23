import axios from './axiosInstance';

export default (token) => {
  if (token) {
    // set default headers that will be applied to every request
    axios.defaults.headers.common['x-auth-token'] = token;
    // store token
    localStorage.setItem('token', token);
  } else {
    // remove default headers
    delete axios.defaults.headers.common['x-auth-token'];
    // remove token
    localStorage.removeItem('token');
  }
};
