import { createContext } from "react";

type AuthContextData = {
  signIn(credentials): Promise<void>;
};

const AuthContext = createContext({});
