import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const { sentiment, confidence, text } = result;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Text: "${text}"\nSentiment: ${sentiment}\nConfidence: ${confidence}%`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSentimentStyles = (type) => {
    switch (type) {
      case "Positive":
        return {
          emoji: "😊",
          color: "bg-green-500 dark:bg-green-400",
          bgLight: "bg-green-50 dark:bg-green-900/20",
          textLight: "text-green-700 dark:text-green-400",
          border: "border-green-200 dark:border-green-800/50"
        };
      case "Negative":
        return {
          emoji: "😡",
          color: "bg-red-500 dark:bg-red-400",
          bgLight: "bg-red-50 dark:bg-red-900/20",
          textLight: "text-red-700 dark:text-red-400",
          border: "border-red-200 dark:border-red-800/50"
        };
      default:
        return {
          emoji: "😐",
          color: "bg-amber-500 dark:bg-amber-400",
          bgLight: "bg-amber-50 dark:bg-amber-900/20",
          textLight: "text-amber-700 dark:text-amber-400",
          border: "border-amber-200 dark:border-amber-800/50"
        };
    }
  };

  const style = getSentimentStyles(sentiment);

  return (
    <div className={`w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-lg border ${style.border} p-6 md:p-8 animate-in slide-in-from-bottom-4 fade-in duration-500`}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          Analysis Result
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Result"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col: Sentiment */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest mb-4">
            Overall Sentiment
          </p>
          <div className={`flex flex-col items-center gap-3 px-8 py-4 rounded-2xl ${style.bgLight} ${style.textLight} shadow-inner`}>
            <span className="text-5xl drop-shadow-sm">{style.emoji}</span>
            <span className="text-2xl font-extrabold tracking-tight">{sentiment}</span>
          </div>
        </div>

        {/* Right Col: Confidence */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest mb-6 text-center">
            Confidence Score
          </p>
          
          <div className="w-full max-w-xs relative flex flex-col items-center">
            <span className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 font-mono">
              {confidence}%
            </span>
            
            <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${style.color}`}
              />
            </div>
            <div className="w-full flex justify-between text-xs text-slate-400 mt-2 font-medium">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
