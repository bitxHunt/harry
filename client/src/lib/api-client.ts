import Axios, { type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";

function publicRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  return config;
}

export const public_api = Axios.create({
  baseURL: env.VITE_DEV_API_URL + "/public",
});

public_api.interceptors.request.use(publicRequestInterceptor);
public_api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
