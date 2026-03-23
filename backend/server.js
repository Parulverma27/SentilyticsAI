import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up rate limiting
const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: "Too many analysis requests from this IP, please try again after 15 minutes." },
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.post("/analyze", analyzeLimiter, async (req, res) => {
  const { text, modelType } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const API_URL = modelType === "emotion" 
    ? "https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base"
    : "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment";

  try {
    const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Hugging Face API Error:", result);
      return res.status(response.status).json({ error: result.error || "Error analyzing text" });
    }

    const data = Array.isArray(result) && Array.isArray(result[0]) ? result[0] : result;

    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response format");
    }

    let highestConfidence = data[0];

    if (modelType !== "emotion" && highestConfidence.score < 0.45) {
      highestConfidence = { label: "LABEL_1", score: highestConfidence.score };
    }

    res.json(highestConfidence);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

export default app;
