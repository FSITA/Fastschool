// src/pages/api/generate-quiz.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("🔹 Incoming request body:", req.body); // DEBUG A

  const { sourceType, sourceValue, difficulty } = req.body;

  try {
    const prompt = `Create a ${difficulty}-level quiz on: ${sourceValue}. Provide 5 questions and answers.`;

    console.log("🔹 Sending prompt to OpenAI:", prompt); // DEBUG B

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("🔹 OpenAI response object:", completion); // DEBUG C
    console.log("🔹 OpenAI response text:", completion.choices[0].message?.content); // DEBUG D

    res.status(200).json({ quiz: completion.choices[0].message?.content });
  } catch (error) {
    console.error("❌ Error calling OpenAI:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}
