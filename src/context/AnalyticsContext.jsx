import { createContext, useState, useEffect, useContext } from 'react';
import { analyzeSentiment } from '../api/sentimentApi';

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [history, setHistory] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sentimentHistory");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("sentimentHistory", JSON.stringify(history));
  }, [history]);

  const labelMap = {
    LABEL_0: "Negative",
    LABEL_1: "Neutral",
    LABEL_2: "Positive",
  };

  const handleAnalyze = async (text) => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError("");
    setCurrentResult(null);

    try {
      const data = await analyzeSentiment(text);
      const newResult = {
        id: crypto.randomUUID(),
        text,
        sentiment: labelMap[data.label],
        confidence: (data.score * 100).toFixed(2),
        timestamp: new Date().toISOString(),
      };
      setCurrentResult(newResult);
      setHistory(prev => [newResult, ...prev]);
    } catch (err) {
      setError(err.message || "Failed to analyze sentiment.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <AnalyticsContext.Provider value={{ 
      isLoading, currentResult, history, 
      error, handleAnalyze, clearHistory, setError, setCurrentResult
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => useContext(AnalyticsContext);
