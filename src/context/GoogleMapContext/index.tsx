import { MapContextInterface } from '../../interfaces';
import { createContext, useContext } from 'react';

export const GoogleMapContext = createContext<MapContextInterface | null>(null);

export function useGoogleMapContext() {
  const context = useContext(GoogleMapContext);

  if (context === undefined || context === null) {
    throw Error('Context is undefined');
  }

  return context;
}
