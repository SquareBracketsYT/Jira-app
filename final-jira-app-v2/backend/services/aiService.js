const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");

// Auto-Completion using Gemini
const getTaskSuggestions = async (inputText) => {
    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [{ parts: [{ text: `Suggest task names for: ${inputText}` }] }]
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: process.env.GOOGLE_PALM_API_KEY }
            }
        );

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion found.";
    } catch (error) {
        console.error("Error in Google PaLM API:", error?.response?.data || error.message);
        return "Error fetching suggestions.";
    }
};


// Spell & Grammar Check using LanguageTool
const checkGrammar = async (text) => {
    try {
        const response = await axios.post("https://api.languagetool.org/v2/check", {
            text: text,
            language: "en-US"
        });

        return response.data.matches.map(match => ({
            error: match.message,
            replacements: match.replacements.map(r => r.value)
        }));
    } catch (error) {
        console.error("Error in LanguageTool API:", error);
        return [];
    }
};


// Task Time Prediction using Google Gemini
const predictTaskTime = async (taskText) => {
    try {
        // const accessToken = await getAccessToken();
        // const response = await axios.post(
        //     `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/text-bison:predict`,
        //     {
        //         instances: [{ task_description: taskText }]
        //     },
        //     {
        //         headers: {
        //             "Authorization": `Bearer ${accessToken}`,  // Ensure it's a string
        //             "Content-Type": "application/json",
        //         }
        //     }
        // );
        // console.log("Prediction:", response.data);
        // return response.data;

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [{ parts: [{ text: `Give answer in 1 line only. How much time it will take me complete this task in hours and minutes : ${taskText}` }] }]
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: process.env.GOOGLE_PALM_API_KEY }
            }
        );

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestion found.";
    } catch (error) {
        console.error("Error in Vertex AI:", error);
        return null;
    }
};

module.exports = { getTaskSuggestions, checkGrammar, predictTaskTime };
