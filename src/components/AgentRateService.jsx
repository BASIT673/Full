// src/services/PackageService.js
// import axios from 'axios';

// const API_URL =  'http://localhost:5000/api';

// // Add auth token to requests
// const authHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const PackageService = {
//   getAllPackages: async () => {
//     try {
//       const response = await axios.get(`${API_URL}/agentRate`, { 
//         headers: authHeader() 
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error getting packages:', error);
//       throw error;
//     }
//   },

//   getPackageById: async (id) => {
//     try {
//       const response = await axios.get(`${API_URL}/packages/${id}`, { 
//         headers: authHeader() 
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error getting package ${id}:`, error);
//       throw error;
//     }
//   },

//   createPackage: async (packageData) => {
//     try {
//       const response = await axios.post(`${API_URL}/agentRate`, packageData, { 
//         // headers: authHeader() 
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error creating package:', error);
//       throw error;
//     }
//   },

//   updatePackage: async (id, packageData) => {
//     try {
//       const response = await axios.patch(`${API_URL}/agentRate/${id}`, packageData, { 
//         headers: authHeader() 
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating package ${id}:`, error);
//       throw error;
//     }
//   },

//   deletePackage: async (id) => {
//     try {
//       const response = await axios.delete(`${API_URL}/agentRate/${id}`, { 
//         headers: authHeader() 
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting package ${id}:`, error);
//       throw error;
//     }
//   },

//   getPackagesByLocation: async (location) => {
//     try {
//       const response = await axios.get(`${API_URL}/agentRate/location/${location}`, { 
//         headers: authHeader() 
//       });
//       return response.data;
//     } catch (error) {
//       console.error(`Error getting packages for location ${location}:`, error);
//       throw error;
//     }
//   }
// };

// export default PackageService;




import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const PackageService = {
  getAllPackages: async () => {
    try {
      const response = await axios.get(`${API_URL}/agentRate`);
      return response.data;
    } catch (error) {
      console.error('Error getting packages:', error);
      throw error;
    }
  },

  getPackageById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/agentRate/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting package ${id}:`, error);
      throw error;
    }
  },

  createPackage: async (packageData) => {
    try {
      const response = await axios.post(`${API_URL}/agentRate`, packageData);
      return response.data;
    } catch (error) {
      console.error('Error creating package:', error);
      throw error;
    }
  },

  updatePackage: async (id, packageData) => {
    try {
      const response = await axios.patch(`${API_URL}/agentRate/${id}`, packageData);
      return response.data;
    } catch (error) {
      console.error(`Error updating package ${id}:`, error);
      throw error;
    }
  },

  deletePackage: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/agentRate/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting package ${id}:`, error);
      throw error;
    }
  },

  getPackagesByLocation: async (location) => {
    try {
      const response = await axios.get(`${API_URL}/agentRate/location/${location}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting packages for location ${location}:`, error);
      throw error;
    }
  }
};

export default PackageService;
