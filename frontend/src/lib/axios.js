import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // with this we can send the cookies in every single request
});