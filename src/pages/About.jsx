import { motion } from "framer-motion";
import { BrainCircuit, Zap, Lock, Code2 } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <BrainCircuit size={24} />,
      title: "Advanced AI Model",
      desc: "Powered by Hugging Face's twitter-roberta-base-sentiment model, fine-tuned for precise textual analysis."
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast",
      desc: "Delivers near-instant sentiment predictions across positive, neutral, and negative states."
    },
    {
      icon: <Lock size={24} />,
      title: "Privacy Focused",
      desc: "Your data is only stored locally on your device for history tracing. We don't save your inputs."
    },
    {
      icon: <Code2 size={24} />,
      title: "Modern Stack",
      desc: "Built with React, Tailwind CSS, Framer Motion, and Node.js for a seamless user experience."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto w-full py-10"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
          About Sentilytics AI
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Sentilytics AI is a production-grade sentiment analysis tool designed to help researchers, marketers, and developers quickly understand the emotional tone behind arbitrary text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
