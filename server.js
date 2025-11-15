import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are NOVA, a futuristic AI assistant like Jarvis." },
          { role: "user", content: message }
        ]
      }),
    });

    const data = await response.json();
    res.json({
      reply: data.choices?.[0]?.message?.content || "Error processing request."
    });

  } catch (error) {
    res.json({ reply: "Server error occurred." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("NOVA online on port " + PORT));
