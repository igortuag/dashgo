import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { api } from "./api";

let cookies = parseCookies();
let isRefreshing = false;

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
        cookies = parseCookies();

        const { "nextauth.refreshToken": refreshToken } = cookies;

        if (!refreshToken) {
          isRefreshing = true;

          api
            .post("/refresh", {
              refreshToken,
            })
            .then((response) => {
              const { token } = response.data;
              setCookie(undefined, "nextauth", token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/",
              });
              setCookie(
                undefined,
                "nextauth.refreshtoken",
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                }
              );
            });
        }
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
