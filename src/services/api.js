import axios from 'axios';

const api = axios.create({
  // URL matches your Spring Boot structure with versioning
  baseURL: 'http://localhost:8080/api/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;