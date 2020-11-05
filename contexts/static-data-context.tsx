import { createContext, useContext } from 'react';

export const StaticDataContext = createContext<any>(undefined);

export const useStaticData = () => useContext(StaticDataContext);
