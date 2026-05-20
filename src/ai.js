import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function generateContent(prompt) {
    // This will print to your browser console to prove Vite sees your token!
    console.log("Token check:", import.meta.env.VITE_HF_ACCESS_TOKEN ? "Token exists!" : "Token is missing!");

        try {
        const response = await hf.chatCompletion({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [
                { role: "system", content: "You are an expert writing assistant named Quill. Output ONLY the requested content. Do not include conversational filler." },
                { role: "user", content: prompt }
            ],
            max_tokens: 1024,
        });
        return response.choices[0].message.content;
    } 
 catch (err) {
        // This will tell us EXACTLY what Hugging Face is complaining about
        console.error("Full Error:", err); 
        return "Sorry, Quill ran into an error generating that. Please check your API key or try again.";
    }
}
