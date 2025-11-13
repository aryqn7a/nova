import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html + static files from the same directory
app.use(express.static(__dirname));
app.use(bodyParser.json());

// Main route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Chat route
app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Nova, an AI assistant inspired by Jarvis. Be helpful, confident, and futuristic." },
          { role: "user", content: userMsg }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn’t process that.";
    res.json({ reply });

  } catch (err) {
    console.error("Error:", err);
    res.json({ reply: "Error reaching AI server." });
  }
});

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => console.log(`✅ Nova online on port ${PORT}`));
