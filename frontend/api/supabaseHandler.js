import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        const { data, error } = await supabase
            .from('chat_questions')
            .insert([{                
                question: question,   // ✅ Correct Column Name
                created_at: new Date().toISOString() // Optional if auto-generated
            }]);

        if (error) {
            console.error("Supabase Insert Error:", error);
            return res.status(500).json({ error: "Failed to save question" });
        }

        return res.status(200).json({ message: "Question saved successfully!" });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
