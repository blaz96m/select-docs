import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://api.themoviedb.org/3";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default axiosClient;
