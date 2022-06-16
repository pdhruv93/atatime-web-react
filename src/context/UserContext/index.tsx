import { UserContextInterface } from '../../interfaces';
import { createContext, useContext } from 'react';

export const UserContext = createContext<UserContextInterface | null>(null);

export function useUserContext(): UserContextInterface {
  const context = useContext(UserContext);

  if (context === undefined || context === null) {
    throw Error('Context is undefined');
  }

  return context;
}
