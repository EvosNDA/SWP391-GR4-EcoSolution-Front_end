import api from './api';

const reportService = {
  // CITIZEN: Create a new report
  // Match @PostMapping
  createReport: async (reportData) => {
    const response = await api.post('/reports', reportData);
    return response.data;
  },

  // CITIZEN: Get history by ID
  // Match @GetMapping("/citizen/{citizenId}")
  getCitizenHistory: async (citizenId) => {
    const response = await api.get(`/reports/citizen/${citizenId}`);
    return response.data;
  },

  // MANAGER: View pending reports
  // Match @GetMapping("/pending")
  getPendingReports: async () => {
    const response = await api.get('/reports/pending');
    return response.data;
  },

  // MANAGER: Assign Collector
  // Match @PutMapping("/assign")
  assignCollector: async (assignData) => {
    const response = await api.put('/reports/assign', assignData);
    return response.data;
  },

  // COLLECTOR: View tasks
  // Match @GetMapping("/collector/{collectorId}")
  getCollectorTasks: async (collectorId) => {
    const response = await api.get(`/reports/collector/${collectorId}`);
    return response.data;
  },

  // COLLECTOR: Update status
  // Match @PutMapping("/{id}/status")
  updateStatus: async (id, statusData) => {
    const response = await api.put(`/reports/${id}/status`, statusData);
    return response.data;
  }
};

export default reportService;