const url = "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment";

async function test(text) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });
    console.log(text, await res.text());
  } catch (e) { console.log(e); }
}

test("its a good idea but poorly executed");
