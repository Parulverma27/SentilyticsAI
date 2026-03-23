import { useAnalytics } from "../context/AnalyticsContext";
import HistoryList from "../components/HistoryList";
import AnalyticsCharts from "../components/AnalyticsCharts";
import { motion } from "framer-motion";
import { BarChart3, Clock, Trash2 } from "lucide-react";

export default function Dashboard() {
  const { history, clearHistory } = useAnalytics();

  if (!history || history.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="text-slate-400" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No history yet</h2>
        <p className="text-slate-500 max-w-sm mx-auto">
          Analyze some text on the home page to see your history and analytics here.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="text-indigo-500" />
            Insights Dashboard
          </h1>
          <p className="text-slate-500 mt-1">View your sentiment analytics and recent history</p>
        </div>

        <button 
          onClick={clearHistory}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-lg transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Clear History
        </button>
      </div>

      <AnalyticsCharts history={history} />
      
      <HistoryList history={history} />
    </motion.div>
  );
}
