// Simulates an API call to an AI Sentiment Analysis service
export async function analyzeText(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!text || text.trim().length === 0) {
        return reject(new Error("Text cannot be empty"));
      }
      
      const lowerText = text.toLowerCase();
      let sentiment = "Neutral";
      let confidence = Math.floor(Math.random() * 20) + 40; // 40-60% default

      const positiveWords = ["good", "great", "excellent", "amazing", "love", "happy", "awesome", "fantastic", "perfect"];
      const negativeWords = ["bad", "terrible", "awful", "hate", "sad", "angry", "worst", "poor", "horrible", "disappointing"];

      let posCount = 0;
      let negCount = 0;

      positiveWords.forEach((word) => {
        if (lowerText.includes(word)) posCount++;
      });

      negativeWords.forEach((word) => {
        if (lowerText.includes(word)) negCount++;
      });

      if (posCount > negCount) {
        sentiment = "Positive";
        confidence = Math.min(100, 60 + posCount * 10 + Math.floor(Math.random() * 15));
      } else if (negCount > posCount) {
        sentiment = "Negative";
        confidence = Math.min(100, 60 + negCount * 10 + Math.floor(Math.random() * 15));
      } else if (posCount > 0 && posCount === negCount) {
        sentiment = "Neutral";
        confidence = Math.min(100, 50 + Math.floor(Math.random() * 20));
      }

      resolve({
        sentiment,
        confidence,
        timestamp: new Date().toISOString()
      });
    }, 1500); // 1.5s artificial delay to simulate network latency
  });
}
