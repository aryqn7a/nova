import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/nova", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const aiReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't process that.";

    res.json({ reply: aiReply });
  } catch (error) {
    console.log(error);
    res.json({ reply: "Server error while contacting AI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NOVA (Gemini) running on port ${PORT}`));
