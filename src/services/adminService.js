import api from './api';

const adminService = {
  getSummaryStats: async () => {
    const response = await api.get('/admin/stats/summary');
    return response.data;
  },

  getTopCollectors: async () => {
    const response = await api.get('/admin/stats/top-collectors');
    return response.data;
  }
};

export default adminService;
