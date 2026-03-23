import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { motion } from 'framer-motion';

export default function AnalyticsCharts({ history }) {
  if (!history || history.length === 0) return null;

  const sentimentCounts = history.reduce((acc, curr) => {
    acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: 'Positive', value: sentimentCounts['Positive'] || 0, color: '#10b981' }, // emerald-500
    { name: 'Neutral', value: sentimentCounts['Neutral'] || 0, color: '#f59e0b' }, // amber-500
    { name: 'Negative', value: sentimentCounts['Negative'] || 0, color: '#ef4444' } // red-500
  ].filter(d => d.value > 0);

  // Take the latest 10 and reverse so chronologically they appear left-to-right
  const barData = history.slice(0, 10).reverse().map((item, i) => ({
    name: `${i + 1}`,
    confidence: parseFloat(item.confidence),
    sentiment: item.sentiment,
  }));

  const getBarColor = (sentiment) => {
    if (sentiment === 'Positive') return '#10b981';
    if (sentiment === 'Negative') return '#ef4444';
    return '#f59e0b';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
    >
      {/* Pie Chart */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Sentiment Distribution</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Recent Confidence Scores (%)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} width={30} />
              <RechartsTooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="confidence" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.sentiment)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
