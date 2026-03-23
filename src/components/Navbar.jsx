import { Moon, Sun, Activity, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ isDarkMode, toggleDarkMode }) {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="w-full h-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 transition-colors duration-300 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
            <Activity size={20} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight">
            Sentilytics AI
          </h1>
        </Link>
        
        <div className="hidden md:flex gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Mobile menu could be here, but we will just show standard dark mode for now */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
