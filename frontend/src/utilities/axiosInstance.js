import axios from "axios";

const axiosInstance = axios.create({
   baseURL: "http://localhost:8000/api/v1/", // API Base URL
   headers: {
      "Content-Type": "application/json",
   },
});

export default axiosInstance;
