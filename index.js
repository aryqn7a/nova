import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  if (!userMsg) return res.json({ reply: "No message received." });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",   // ✔ Better model & works today
        messages: [
          {
            role: "system",
            content: "You are NOVA — a confident, helpful futuristic assistant."
          },
          { role: "user", content: userMsg }
        ]
      })
    });

    const data = await response.json();

    // Debug if there's a problem
    console.log("OPENAI RESPONSE:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "NOVA: Sorry, I couldn't process that.";

    res.json({ reply });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.json({ reply: "Error: The AI server could not be reached." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NOVA is online on port ${PORT}`));
