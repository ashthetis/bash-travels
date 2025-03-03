import { OpenAI } from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: "Question is required" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: question }],
            max_tokens: 100,
        });

        return res.status(200).json({ answer: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        return res.status(500).json({ error: "Failed to fetch response from OpenAI." });
    }
}
