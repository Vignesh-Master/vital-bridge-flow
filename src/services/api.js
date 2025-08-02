// API Service for OrganLink Backend Integration
import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:8081/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token and tenant ID
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hospital_token');
    const tenantId = localStorage.getItem('hospital_tenant_id');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear storage and redirect to login
      localStorage.removeItem('hospital_token');
      localStorage.removeItem('hospital_tenant_id');
      localStorage.removeItem('hospital_info');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Hospital login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  // Hospital logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  // Validate token
  validateToken: async () => {
    const response = await api.get('/auth/validate');
    return response.data;
  },
  
  // Get current hospital info
  getCurrentHospital: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// Location API
export const locationAPI = {
  // Get all countries
  getCountries: async () => {
    const response = await api.get('/locations/countries');
    return response.data;
  },
  
  // Get states by country
  getStates: async (countryId = null) => {
    const url = countryId ? `/locations/states?countryId=${countryId}` : '/locations/states';
    const response = await api.get(url);
    return response.data;
  },
  
  // Get location hierarchy
  getLocationHierarchy: async () => {
    const response = await api.get('/locations/hierarchy');
    return response.data;
  }
};

// Hospital API
export const hospitalAPI = {
  // Get all hospitals
  getHospitals: async (page = 0, size = 20) => {
    const response = await api.get(`/hospitals?page=${page}&size=${size}`);
    return response.data;
  },
  
  // Get hospital by ID
  getHospitalById: async (id) => {
    const response = await api.get(`/hospitals/${id}`);
    return response.data;
  },
  
  // Create hospital (admin only)
  createHospital: async (hospitalData) => {
    const response = await api.post('/hospitals', hospitalData);
    return response.data;
  },
  
  // Update hospital
  updateHospital: async (id, hospitalData) => {
    const response = await api.put(`/hospitals/${id}`, hospitalData);
    return response.data;
  }
};

// Donor API (Hospital-specific)
export const donorAPI = {
  // Get hospital donors
  getDonors: async (page = 0, size = 20, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/donors?${params}`);
    return response.data;
  },
  
  // Get donor by ID
  getDonorById: async (id) => {
    const response = await api.get(`/donors/${id}`);
    return response.data;
  },
  
  // Create donor
  createDonor: async (donorData) => {
    const response = await api.post('/donors', donorData);
    return response.data;
  },
  
  // Update donor
  updateDonor: async (id, donorData) => {
    const response = await api.put(`/donors/${id}`, donorData);
    return response.data;
  },
  
  // Get donor statistics
  getDonorStats: async () => {
    const response = await api.get('/donors/stats');
    return response.data;
  }
};

// Patient API (Hospital-specific)
export const patientAPI = {
  // Get hospital patients
  getPatients: async (page = 0, size = 20, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/patients?${params}`);
    return response.data;
  },
  
  // Get patient by ID
  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },
  
  // Create patient
  createPatient: async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data;
  },
  
  // Update patient
  updatePatient: async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  },
  
  // Get patient statistics
  getPatientStats: async () => {
    const response = await api.get('/patients/stats');
    return response.data;
  },
  
  // Get critical patients
  getCriticalPatients: async () => {
    const response = await api.get('/patients/critical');
    return response.data;
  }
};

// Organ Types API
export const organTypeAPI = {
  // Get all organ types
  getOrganTypes: async () => {
    const response = await api.get('/organ-types');
    return response.data;
  },
  
  // Get organ type by ID
  getOrganTypeById: async (id) => {
    const response = await api.get(`/organ-types/${id}`);
    return response.data;
  }
};

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('hospital_token');
  },
  
  // Get current hospital info
  getCurrentHospitalInfo: () => {
    const hospitalInfo = localStorage.getItem('hospital_info');
    return hospitalInfo ? JSON.parse(hospitalInfo) : null;
  },
  
  // Get current tenant ID
  getCurrentTenantId: () => {
    return localStorage.getItem('hospital_tenant_id');
  },
  
  // Clear authentication data
  clearAuth: () => {
    localStorage.removeItem('hospital_token');
    localStorage.removeItem('hospital_tenant_id');
    localStorage.removeItem('hospital_info');
  }
};

// Admin API
export const adminAPI = {
  // Get system statistics
  getStatistics: async () => {
    const response = await api.get('/admin/statistics');
    return response.data;
  },

  // Hospital management
  getHospitals: async (page = 0, size = 20, search = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (search) {
      params.append('search', search);
    }

    const response = await api.get(`/admin/hospitals?${params}`);
    return response.data;
  },

  createHospital: async (hospitalData) => {
    const response = await api.post('/admin/hospitals', hospitalData);
    return response.data;
  },

  updateHospital: async (id, hospitalData) => {
    const response = await api.put(`/admin/hospitals/${id}`, hospitalData);
    return response.data;
  },

  getHospitalById: async (id) => {
    const response = await api.get(`/admin/hospitals/${id}`);
    return response.data;
  },

  // Policy management
  getAllPolicies: async (organType = '') => {
    const params = organType ? `?organType=${organType}` : '';
    const response = await api.get(`/admin/policies${params}`);
    return response.data;
  }
};

// AI Matching API
export const aiMatchingAPI = {
  // Find matches for patient
  findMatches: async (patientId) => {
    const response = await api.post(`/ai-matching/find-matches/${patientId}`);
    return response.data;
  },

  // Get match notifications
  getNotifications: async () => {
    const response = await api.get('/ai-matching/notifications');
    return response.data;
  },

  // Get unread notifications count
  getUnreadCount: async () => {
    const response = await api.get('/ai-matching/notifications/unread-count');
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await api.put(`/ai-matching/notifications/${notificationId}/read`);
    return response.data;
  },

  // Get active policies for organ type
  getPolicies: async (organType) => {
    const response = await api.get(`/ai-matching/policies/${organType}`);
    return response.data;
  },

  // Manual trigger matching
  triggerMatching: async () => {
    const response = await api.post('/ai-matching/trigger-matching');
    return response.data;
  }
};

// Signature Verification API
export const signatureAPI = {
  // Verify and store signature
  verifyAndStore: async (formData) => {
    // Get tenant ID from localStorage (set during login)
    const hospitalData = JSON.parse(localStorage.getItem('hospital_data') || '{}');
    const tenantId = hospitalData.tenantId || 'apollo-chennai';

    const response = await api.post('/signatures/verify-and-store', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Tenant-ID': tenantId,
      },
    });
    return response.data;
  },

  // Get signature status
  getStatus: async (entityType, entityId) => {
    const response = await api.get(`/signatures/status/${entityType}/${entityId}`);
    return response.data;
  }
};

export default api;
