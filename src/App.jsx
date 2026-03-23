import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsProvider } from "./context/AnalyticsContext";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <AnalyticsProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="flex-1 flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/20 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </BrowserRouter>
    </AnalyticsProvider>
  );
}

export default App;