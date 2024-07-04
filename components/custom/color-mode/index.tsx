import { COLOR_THEME_CASE } from "@/constant";
import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { RiMoonClearFill } from "react-icons/ri";

export const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("COLOR_THEME_CASE");

    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <button
      className="bg-slate-900 dark:bg-slate-400 rounded-full shadow-xl p-2
      bg-opacity-40"
      onClick={() => {
        if (!document) {
          return;
        }

        document.documentElement.classList.toggle("dark");

        const mode = localStorage.getItem(COLOR_THEME_CASE);

        if (mode === "dark") {
          localStorage.removeItem(COLOR_THEME_CASE);
          setIsDarkMode(false);
        } else {
          setIsDarkMode(true);
          localStorage.setItem(COLOR_THEME_CASE, "dark");
        }
      }}
    >
      {isDarkMode ? <RiMoonClearFill /> : <FaSun />}
    </button>
  );
};
