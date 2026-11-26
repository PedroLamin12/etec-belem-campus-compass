import { useEffect, useState } from "react";

const KEY = "tour-etec-theme";
/** Browser/status-bar colour for each theme; keep in sync with --background in styles.css. */
export const THEME_BAR = { light: "#f8fafc", dark: "#09090b" } as const;

/** Runs before paint so the saved theme never flashes. Light is the default in the browser and the installed app alike. */
export const themeScript = `(function(){try{var d=localStorage.getItem('${KEY}')==='dark';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',d?'${THEME_BAR.dark}':'${THEME_BAR.light}')}catch(e){}})()`;

export function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next ? THEME_BAR.dark : THEME_BAR.light);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
    setDark(next);
  };
  return { dark, toggle };
}
