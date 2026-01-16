import { createContext } from "react";
import type { AuthContextType } from "../types/AuthTypes";

// Just the context object (no JSX here)
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: () => {},
});
