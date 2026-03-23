import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InputBox({ onAnalyze, isLoading }) {
  const [text, setText] = useState("");
  const MAX_CHARS = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading && text.length <= MAX_CHARS) {
      onAnalyze(text);
    }
  };

  const remainingChars = MAX_CHARS - text.length;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Enter Text for Analysis
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type a sentence here to analyze its sentiment..."
            className={`w-full h-32 p-4 pb-8 rounded-xl border ${
              isOverLimit 
                ? "border-red-500 focus:ring-red-500" 
                : "border-slate-200 dark:border-slate-700 focus:ring-indigo-500"
            } bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:border-transparent outline-none resize-none transition-all placeholder:text-slate-400`}
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-4 flex items-center justify-between pointer-events-none">
            <span className={`text-xs font-medium ${isOverLimit ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
              {text.length} / {MAX_CHARS}
            </span>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!text.trim() || isLoading || isOverLimit}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:shadow-none"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 size={18} className="animate-spin" />
                  <span>Analyzing...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Send size={18} />
                  <span>Analyze</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </form>
    </div>
  );
}
