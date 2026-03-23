import { useAnalytics } from "../context/AnalyticsContext";
import InputBox from "../components/InputBox";
import ResultCard from "../components/ResultCard";
import { motion } from "framer-motion";

export default function Home() {
  const { handleAnalyze, isLoading, error, currentResult } = useAnalytics();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto flex flex-col gap-8 w-full"
    >
      <div className="text-center space-y-4 mb-4">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 tracking-tight">
          Analyze any text with AI
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Get instant sentiment analysis and confidence scores using a real AI model.
        </p>
      </div>

      {/* INPUT */}
      <div className="w-full relative z-10">
        <InputBox onAnalyze={handleAnalyze} isLoading={isLoading} />
      </div>

      {/* ERROR */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 text-center shadow-lg shadow-red-500/10"
        >
          {error}
        </motion.div>
      )}

      {/* RESULT */}
      {currentResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <ResultCard result={currentResult} />
        </motion.div>
      )}
    </motion.div>
  );
}
