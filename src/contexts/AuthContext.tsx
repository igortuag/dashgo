import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { apiAuth } from "../services/apiAuth";
import { setCookie } from "nookies";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated(): boolean;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  name: string;
  email: string;
  permissions: string[];
  roles: string[];
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();
  const [user, setUser] = useState<User>();
  const isAuthenticated = () => !!user;

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

      push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
