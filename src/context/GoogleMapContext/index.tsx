import { createContext, useContext } from "react";
import { MapContextInterface } from "../../interfaces";

export const GoogleMapContext = createContext<MapContextInterface | null>(null);

export function useGoogleMapContext() {
  let context = useContext(GoogleMapContext);

  if (context === undefined || context === null) {
    throw Error("Context is undefined");
  }

  return context;
}
