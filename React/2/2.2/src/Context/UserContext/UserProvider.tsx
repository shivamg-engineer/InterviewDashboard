import { useState, useMemo, type ReactNode } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    name: "Shivam",
    age: 25,
  });

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
