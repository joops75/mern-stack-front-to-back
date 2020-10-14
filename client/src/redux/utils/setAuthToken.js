import axios from 'axios';

export default (token) => {
  if (token) {
    // set default headers that will be applied to every request
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
