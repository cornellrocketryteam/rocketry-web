import { createContext } from 'react';

export const DashboardContext = createContext({
  screen: 0,
  setScreen: () => {},
});
