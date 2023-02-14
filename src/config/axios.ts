import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tracking.bosta.co/",
//   params: {
//     api_key: "7a1c19ea3c361a4d3cc53eb70ef8298c",
//   },
});
axiosInstance.interceptors.request.use(function (config) {
  //config.headers["a"]="dsdsd"
  return config;
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
});
