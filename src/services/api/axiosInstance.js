import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://linked-posts.routemisr.com",
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default axiosInstance;
