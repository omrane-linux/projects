const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function check() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API key found");
        return;
    }
    console.log("Checking models with key ending in...", key.slice(-4));

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            const text = await response.text();
            console.error("Body:", text);
            return;
        }
        const data = await response.json();
        const names = data.models ? data.models.map(m => m.name) : [];
        console.log("Model Names:", names.join("\n"));
        const fs = require('fs');
        fs.writeFileSync('valid_models.txt', names.join('\n'));
    } catch (e) {
        console.error("Fetch error:", e);
    }
}

check();
