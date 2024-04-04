import axios, { AxiosInstance } from 'axios';

export const apiUrl = process.env.REACT_APP_API_DEV_FLAG
  ? <string>process.env.REACT_APP_API_URL_DEV
  : <string>process.env.REACT_APP_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

export default API;
