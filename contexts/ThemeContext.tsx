import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type Scheme = "light" | "dark";

type ThemeContextValue = {
  scheme: Scheme;
  toggle: () => void;
  setScheme: (s: Scheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProviderLocal({ children }: { children: React.ReactNode }) {
  const system = useSystemColorScheme() === "dark" ? "dark" : "light";
  const [scheme, setSchemeState] = useState<Scheme>(system);

  const setScheme = useCallback((s: Scheme) => setSchemeState(s), []);
  const toggle = useCallback(() => setSchemeState((p) => (p === "dark" ? "light" : "dark")), []);

  const value = useMemo(() => ({ scheme, toggle, setScheme }), [scheme, toggle, setScheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeLocal(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeLocal must be used within ThemeProviderLocal");
  return ctx;
}


