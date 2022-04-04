import axios, { AxiosError, AxiosRequestConfig } from "axios";

// axios instance
const axiosInstance = axios.create({
  baseURL: process.env.baseUrl,
});
// const unCheckList: string[] = [];

// axios request interceptors
axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const url = config.url || "";

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
    Promise.reject(error);
  }
);

// axios response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
