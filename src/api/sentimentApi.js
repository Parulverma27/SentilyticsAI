export const analyzeSentiment = async (text) => {
  const response = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to analyze sentiment from backend");
  }

  return data;
};