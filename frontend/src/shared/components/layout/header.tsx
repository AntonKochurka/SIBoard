import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthMenu from "./auth_menu";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return saved === "true";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center space-x-8">
        <Link to="/">
          <h1
            className={`text-xl font-bold tracking-tight ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <span className="bg-gray-800 dark:bg-gray-200 text-gray-50 dark:text-gray-900 px-2 py-1 rounded mr-1">
              SI
            </span>
            Board
          </h1>
        </Link>

        <nav
          className={`flex mt-2 space-x-6 text-sm font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {["Notes", "Todos", "Kanbans", "Pomodoro"].map((item) => (
            <Link
              key={item}
              to="#"
              className={`pb-1 border-b-2 transition-all ${
                darkMode
                  ? "border-transparent hover:border-gray-600 hover:text-white"
                  : "border-transparent hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <AuthMenu darkMode={darkMode}/>
    
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md transition-colors ${
            darkMode ? "hover:bg-gray-800 text-yellow-400" : "hover:bg-gray-200 text-gray-700"
          }`}
          aria-label="Toggle theme"
        >
          {darkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
