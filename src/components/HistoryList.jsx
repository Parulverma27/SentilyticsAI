import { useState } from "react";
import { Clock, MessageSquareQuote, Filter } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryList({ history }) {
  const [filter, setFilter] = useState('All');

  if (!history || history.length === 0) return null;

  const filteredHistory = history.filter(item => filter === 'All' || item.sentiment === filter);

  return (
    <div className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 text-slate-800 dark:text-slate-100">
        <div className="flex items-center gap-2">
          <Clock size={20} className="text-indigo-500" />
          <h2 className="text-lg font-semibold">History log</h2>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter size={16} className="text-slate-400 mr-1" />
          {['All', 'Positive', 'Neutral', 'Negative'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors",
                filter === f 
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredHistory.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-slate-500 dark:text-slate-400 col-span-full text-center py-8"
            >
              No {filter !== 'All' ? filter.toLowerCase() : ''} results found.
            </motion.p>
          ) : (
            filteredHistory.map((item, index) => {
              const isPositive = item.sentiment === "Positive";
              const isNegative = item.sentiment === "Negative";
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item.id || item.timestamp || index}
                  className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                       <MessageSquareQuote size={18} className="text-indigo-400 shrink-0" />
                       <span className="text-xs text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                        {item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-4 italic leading-relaxed">
                      "{item.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div
                      className={cn(
                        "px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-full text-xs font-bold",
                        isPositive && "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
                        isNegative && "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
                        !isPositive && !isNegative && "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                      )}
                    >
                      {item.sentiment}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {item.confidence}%
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
