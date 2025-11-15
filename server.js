import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message
      })
    });

    const data = await response.json();
    console.log("🔵 RAW API RESPONSE:", data);

    // Handle OpenAI errors
    if (data?.error) {
      console.log("🔴 OPENAI ERROR:", data.error);
      return res.json({ reply: "NOVA: Could not process that message." });
    }

    // Extract output text from Responses API
    let reply = data?.output_text;

    // Fallbacks for rare OpenAI response structures
    if (!reply) reply = data?.choices?.[0]?.text;
    if (!reply) reply = data?.choices?.[0]?.message?.content;
    if (!reply) reply = "NOVA: Unable to respond.";

    res.json({ reply });

  } catch (err) {
    console.log("🔥 SERVER ERROR:", err);
    return res.json({ reply: "NOVA: Server error." });
  }
});

// Serve frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 NOVA server running on port " + PORT));
