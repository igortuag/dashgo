import Router, { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { apiAuth } from "../services/apiClient";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  authChannel.postMessage("signOut");

  Router.push("/");
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut: () => void;
  isAuthenticated(): boolean;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  name?: string;
  email: string;
  permissions: string[];
  roles: string[];
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();
  const [user, setUser] = useState<User>();
  const isAuthenticated = () => !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("nextauth");

    authChannel.onmessage = (event) => {};
  }, []);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api.get("me").then((response) => {
        const { email, permissions, roles } = response.data;

        setUser({ email, permissions, roles });
      });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await apiAuth.post("session", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles, name } = response.data;

      setCookie(undefined, "nextauth", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "nextauth.refreshtoken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        name,
        email,
        permissions,
        roles,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
