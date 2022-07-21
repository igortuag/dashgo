import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { apiAuth } from "../services/apiAuth";

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
  email: string;
  permissions: string[];
  roles: string[];
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();
  const [user, setUser] = useState<User>();
  const isAuthenticated = () => false;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await apiAuth.post("session", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({
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
