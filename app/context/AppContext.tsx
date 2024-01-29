"use client";

import { createContext, useState, ReactNode, useContext } from "react";

type StateType = "ncc" | "fim";

type AppContextType = {
  view: StateType;
  setView: React.Dispatch<React.SetStateAction<StateType>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<StateType>("fim");

  return (
    <AppContext.Provider value={{ view, setView }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
