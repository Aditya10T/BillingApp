import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ThemeContext = createContext({});

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  console.log(localStorage.getItem("theme"));
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
