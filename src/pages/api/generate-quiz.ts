import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sourceType, sourceValue, difficulty } = req.body;

  if (sourceType !== "Topic/Text" || !sourceValue) {
    return res.status(400).json({ error: "Only Topic/Text is supported for now" });
  }

  try {
    const prompt = `Use this topic: "${sourceValue}". 
Create 5 multiple-choice questions at ${difficulty} level. 
For each question provide:
- The question
- 4 options (A–D)
- The correct answer
- A 1 sentence explanation.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // cheaper + fast model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
      }),
    });

    const data = await response.json();

    const result = data.choices?.[0]?.message?.content || "No quiz generated.";

    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}
