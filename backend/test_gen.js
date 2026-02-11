require('dotenv').config();
const axios = require('axios');

async function testModel(modelName) {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
    try {
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: "Hello" }] }]
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(`[SUCCESS] ${modelName}: Status ${response.status}`);
        console.log(JSON.stringify(response.data, null, 2));
        return true;
    } catch (error) {
        const status = error.response ? error.response.status : error.message;
        console.log(`${modelName}: FAIL ${status}`);
        if (error.response) console.log(JSON.stringify(error.response.data, null, 2));
        return false;
    }
}

async function run() {
    const models = [
        'gemini-flash-latest'
    ];
    for (const m of models) {
        await testModel(m);
    }
}

run();
