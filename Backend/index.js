import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/enhance", async (req, res) => {
  const userPrompt = req.body.prompt;

  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const systemPrompt = `You are a prompt optimization engine. Strictly follow these rules:
  1. Take the user's prompt and return ONLY the enhanced version—no explanations, notes, or extra text.
  2. Make it more effective, concise, and token-efficient while preserving intent.
  3. Remove unnecessary politeness (e.g., "please", "thank you", "sorry").
  4. Optimize for lower computational cost and sustainability.
  5. Never add conversational elements (e.g., "Here's your improved prompt:").
  6. If the prompt is already optimal, return it unchanged.
  7. If the prompt has a code base then do not process it at all just improve the part that the user wants to convey to the ai
  Enhanced prompt (ONLY OUTPUT THIS):
  `;

  console.log("Received prompt:", userPrompt);

  try {
    const model = generativeAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // or "gemini-1.5-flash"

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nPrompt: ${userPrompt}` }],
        },
      ],
    });

    const response = await result.response;
    const enhanced = response.text();

    res.json({ enhancedPrompt: enhanced });
  } catch (err) {
    console.error("Error during enhancement:", err.message);
    res.status(500).json({
      error: "Failed to enhance prompt",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
