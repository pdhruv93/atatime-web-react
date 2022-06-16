import { createContext, useContext } from "react";
import { UserContextInterface } from "../../interfaces";

export const UserContext = createContext<UserContextInterface | null>(null);

export function useUserContext(): UserContextInterface {
  let context = useContext(UserContext);

  if (context === undefined || context === null) {
    throw Error("Context is undefined");
  }

  return context;
}
