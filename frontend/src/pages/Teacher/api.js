// api.js (helper file for authenticated requests)
import axios from "axios";

export const apiRequest = async (url, method = "GET", data = {}) => {
   const token = localStorage.getItem("token"); // Get token from localStorage

   const headers = {
      Authorization: `Bearer ${token}`, // Include token in Authorization header
   };

   try {
      const response = await axios({
         url,
         method,
         data,
         headers,
      });
      return response.data; // Return response data
   } catch (error) {
      console.error(
         "API request error:",
         error.response?.data || error.message
      );
      throw error;
   }
};
