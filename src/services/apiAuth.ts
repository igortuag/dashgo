import axios, { AxiosError } from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "./api";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue: any[] = [];

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const apiAuth = axios.create({
    baseURL: "http://localhost:3333/api",
    headers: {
      Authorization: `Bearer ${cookies["nextauth.token"]}`,
    },
  });

  function signOut() {
    destroyCookie(ctx, "nextauth.token");
    destroyCookie(ctx, "nextauth.refreshToken");

    Router.push("/");
  }

  apiAuth.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx);

          const { "nextauth.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;

          if (!refreshToken) {
            isRefreshing = true;

            api
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, "nextauth", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });

                setCookie(
                  ctx,
                  "nextauth.refreshtoken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  }
                );

                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${token}`;

                if (failedRequestQueue.length) {
                  failedRequestQueue.forEach((req) => req.onSuccess());
                  failedRequestQueue = [];
                }
              })
              .catch((err) => {
                if (failedRequestQueue.length) {
                  failedRequestQueue.forEach((req) => req.onFailure());
                  failedRequestQueue = [];
                }

                if (typeof window !== "undefined") {
                  signOut();
                } else {
                  return Promise.reject(new AuthTokenError());
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(apiAuth(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (typeof window !== "undefined") {
            signOut();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return apiAuth;
}
