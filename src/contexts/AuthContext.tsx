import { createContext, ReactNode } from "react";
import { apiAuth } from "../services/apiAuth";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated(): boolean;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = () => false;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await apiAuth.post("session", {
        email,
        password,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
