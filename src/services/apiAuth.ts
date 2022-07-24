import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
const cookies = parseCookies();

export const apiAuth = axios.create({
  baseURL: "http://localhost:3333/api",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});

apiAuth.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
