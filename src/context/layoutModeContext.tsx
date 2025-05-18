import { createContext, useState, type ReactNode } from "react";

export interface LayoutModeContextType {
  layoutModeActive : boolean
  switchLayoutMode : () => void
}

const defaultContextValue : LayoutModeContextType = {
    layoutModeActive : false,
    switchLayoutMode : () => void 0
}

export const LayoutModeContext = createContext<LayoutModeContextType>(defaultContextValue);

interface LayoutModeProviderProps {
  children: ReactNode;
}

export function LayoutModeProvider({ children }: LayoutModeProviderProps) {

    const [layoutModeActive, setLayoutModeActive] = useState(false);
    const switchLayoutMode = () => setLayoutModeActive((prev) =>  !prev);

    const contextValue: LayoutModeContextType = {
        layoutModeActive,
        switchLayoutMode,
    };

    return (
        <LayoutModeContext.Provider value={contextValue}>
            {children}
        </LayoutModeContext.Provider>
    );
}