import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Writing Assistant Endpoint
router.post("/assist", async (req, res) => {
  try {
    const { text, type, tone } = req.body;

    let prompt = "";

    switch (type) {
      case "correction":
        prompt = `Correct grammar and spelling while keeping meaning unchanged:\n\n${text}`;
        break;
      case "improvement":
        prompt = `Suggest 3 improvements for clarity, engagement, or flow:\n\n${text}`;
        break;
      case "summary":
        prompt = `Summarize this blog post in 3 bullet points:\n\n${text}`;
        break;
      case "seo":
        prompt = `Suggest an SEO title, meta description, and 5 tags for:\n\n${text}`;
        break;
      case "tone":
        prompt = `Rewrite this text in a ${tone || "friendly"} tone:\n\n${text}`;
        break;
      default:
        return res.status(400).json({ error: "Invalid request type" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a writing assistant for a blog app." },
        { role: "user", content: prompt },
      ],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;
