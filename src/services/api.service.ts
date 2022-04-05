import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { RequestConfig } from "../models/fetcher.model";

// axios instance
const axiosInstance = axios.create({
  // baseURL: process.env.baseUrl,
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});
// const unCheckList: string[] = [];

// axios request interceptors
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // const url = config.url || "";

    // if (!unCheckList.includes(url)) {
    //   // get auth info

    //   const authInfo = getAuthInfo();

    //   // get idToken

    //   const token = authInfo?.idToken;
    //   // update token for Authorization

    //   (config.headers as any)["Authorization"] = token || "";
    // }

    return config;
  },

  (error) => {
    Promise.reject(error.response);
  }
);

// axios response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error.response);
  }
);

export const fetch = (request: RequestConfig): Promise<Response> => {
  return axiosInstance.request(request);
};

export default axiosInstance;
