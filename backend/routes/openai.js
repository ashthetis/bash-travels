require("dotenv").config();
const express = require("express");
const OpenAI = require("openai");

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/ask", async (req, res) => {
    const { question } = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: question }],
            max_tokens: 100,
        });

        res.json({ answer: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "Failed to fetch response from OpenAI." });
    }
});

module.exports = router;
