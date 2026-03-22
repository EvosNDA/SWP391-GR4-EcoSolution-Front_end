import api from './api';

const userService = {
  login: async (username, password) => {
    const response = await api.post('/users/login', { username, password });
    return response.data; // UserResponse object
  },

  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data; // UserResponse object
  },

  getCollectors: async () => {
    const response = await api.get('/users/collectors');
    return response.data; // List of UserResponse objects
  }
};

export default userService;
