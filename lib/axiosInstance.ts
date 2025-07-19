import axios, { AxiosError } from "axios";
import { error } from "console";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
});

let state: "open" | "close" | "delayed" = "open";
let failerCount = 0;
const retryAfterFailerTime = 60;

axiosInstance.interceptors.response.use(
  (responce) => {
    state = "close";
    failerCount = 0;
    return responce;
  },
  (error: AxiosError) => {
    failerCount++;
    if (failerCount < 3 && state === "open") {
      state = "open";
      axiosInstance.get(error.config?.url!);
      return;
    } else {
      state = "delayed";
      setTimeout(() => {
        failerCount = 0;
        state = "open";
        axiosInstance.get(error.config?.url!);
      }, retryAfterFailerTime * 1000);
    }
  }
);
