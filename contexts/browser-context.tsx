import { create } from 'domain';
import { FC, createContext, useLayoutEffect, useState, useContext } from 'react';

export const BrowserContext = createContext<{ window: Window }>(undefined);

export const BrowserContextWrapper: FC<{}> = ({ children }) => {
    const [_window, setWindow] = useState<Window | undefined>()

    useLayoutEffect(() => {
        setWindow(window);
    }, []);

    return !_window
        ? <></>
        : <BrowserContext.Provider value={{ window: _window }}>{children}</BrowserContext.Provider>;
}

export const useWindow = (): Window => useContext(BrowserContext).window;