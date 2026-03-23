const url1 = "https://router.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";
const url2 = "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment";

async function test(url) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: "test" })
    });
    console.log(url, res.status, await res.text());
  } catch (e) { console.log(e); }
}

async function run() {
  await test(url1);
  await test(url2);
}
run();
