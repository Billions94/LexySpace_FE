import axios, { AxiosInstance } from "axios";

export const apiUrl = process.env.REACT_APP_API_URL!;

const API: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-type": "application/json",
  },
});

const refreshAccessToken = async () => {
  const { data } = await API.post("users/refreshToken", {
    currentRefreshToken: localStorage.getItem("refreshToken"),
  });

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data;
};

API.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    config.headers = {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
      "x-refresh": String(refreshToken),
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  //By default we are forwarding the response as-is
  (response) => response,
  //But here we define the error handler
  async function (error) {
    // The configuration for the request that just failed:
    const failedRequest = error.config;

    if (
      // If unauthorized let's try to refresh the tokens...
      error.response.status === 401 &&
      // but won't retry if the failed request was already attempting to refresh the tokens
      failedRequest.url !== "/users/refreshToken"
    ) {
      await refreshAccessToken();

      const retryRequest = API(failedRequest);
      return retryRequest;
    } else {
      return Promise.reject(error);
    }
  }
);

export default API;
