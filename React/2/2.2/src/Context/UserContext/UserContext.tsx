import { createContext } from "react";

export type User = {
  name: string;
  age: number;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | null>(null);
