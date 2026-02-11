const axios = require('axios');

exports.getInvestmentAdvice = async (req, res) => {
    try {
        const {
            age,
            employmentStatus,
            annualIncome,
            monthlySavings,
            investmentGoal,
            timeHorizon,
            riskTolerance,
        } = req.body;

        console.log("AI Controller: Received request for user age:", age);
        try { const fs = require('fs'); fs.appendFileSync('error_log.txt', `${new Date().toISOString()} - Request Received\n`); } catch (e) { }

        // Validation
        if (!process.env.GEMINI_API_KEY) {
            console.error("AI Controller: GEMINI_API_KEY is missing");
            return res.status(500).json({ message: "Gemini API Key not configured" });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        const promptText = `
            Act as a professional financial advisor. Based on the following user profile, provide a personalized investment recommendation.
            
            **User Profile:**
            - **Age:** ${age}
            - **Employment Status:** ${employmentStatus}
            - **Annual Income:** ${annualIncome}
            - **Monthly Savings:** ${monthlySavings}
            - **Investment Goal:** ${investmentGoal}
            - **Time Horizon:** ${timeHorizon}
            - **Risk Tolerance:** ${riskTolerance}

            **Instructions:**
            1.  Analyze the user's financial situation and goal.
            2.  Suggest an asset allocation strategy (e.g., % Stocks, % Bonds, % Cash).
            3.  Recommend specific types of funds or investment vehicles suitable for India (e.g., Mutual Funds, ETFs, PPF, Stocks). Give 2-3 specific examples of well-known fund categories or indexes.
            4.  Provide a brief explanation.
            5.  Format the response in clear Markdown with headers.
        `;

        // Direct REST API usage to avoid SDK versioning issues
        // Switching to gemini-flash-latest which is a valid model alias
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        console.log("AI Controller: Sending REST request to:", url.split('?')[0]);

        const requestBody = {
            contents: [{
                parts: [{
                    text: promptText
                }]
            }]
        };

        const response = await axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("AI Controller: Received response status:", response.status);

        const candidates = response.data.candidates;
        if (candidates && candidates.length > 0) {
            const text = candidates[0].content.parts[0].text;
            res.status(200).json({ recommendation: text });
        } else {
            throw new Error("No candidates returned from Gemini");
        }

    } catch (error) {
        console.error("Error generating AI recommendation:", error.message);

        // Always log to file for debugging
        try {
            const fs = require('fs');
            const logMsg = `${new Date().toISOString()} - Error: ${error.message}\n` +
                (error.response ? `API Status: ${error.response.status}\nAPI Data: ${JSON.stringify(error.response.data)}\n` : 'No API Response\n');
            fs.appendFileSync('error_log.txt', logMsg);
        } catch (e) { }

        let errorMessage = "Failed to generate recommendation";
        let statusCode = 500;
        let details = error.message;

        if (error.response) {
            console.error("Gemini API Error details:", JSON.stringify(error.response.data));
            details = error.response.data.error?.message || JSON.stringify(error.response.data);

            // Handle Rate Limiting (Quota Exceeded)
            if (error.response.status === 429) {
                statusCode = 429;
                errorMessage = "Daily AI usage quota exceeded. Please try again tomorrow.";
            }
            // Handle Service Unavailable
            else if (error.response.status === 503) {
                statusCode = 503;
                errorMessage = "AI Service is temporarily busy. Please try again in a few moments.";
            }
        }

        res.status(statusCode).json({
            message: errorMessage,
            error: details
        });
    }
};
