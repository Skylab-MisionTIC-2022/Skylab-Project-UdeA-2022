import { createContext, useContext } from 'react';

export const userContext = createContext(null);

export const useUser = () => {
  return useContext(userContext);
};
