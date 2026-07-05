import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cleanJson = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

const callGeminiWithRetry = async (prompt) => {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];

  for (const model of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Trying ${model}, attempt ${attempt}`);

        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        return response.text;
      } catch (error) {
        console.log(`${model} attempt ${attempt} failed:`, error.message);

        if (attempt < 3) {
          await sleep(3000);
        }
      }
    }
  }

  throw new Error("AI service is busy. Please try again later.");
};

export const generateStartupReport = async ({
  title,
  idea,
  targetMarket,
  businessModel,
  industry,
  country,
  competitors,
  budget,
  teamSize,
  stage,
  timeline,
}) => {
  const prompt = `
You are VentureLens, an expert AI startup analyst, VC evaluator, product strategist, and market researcher.

Analyze the startup idea deeply and return ONLY valid JSON.
Do not include markdown.
Do not include backticks.
Do not include explanation outside JSON.

Required user inputs:
Startup Title: ${title}
Startup Idea: ${idea}
Target Market: ${targetMarket}
Business Model: ${businessModel}

Optional user inputs:
Industry: ${industry || "Not specified"}
Country/Region: ${country || "Not specified"}
Known Competitors: ${competitors || "Not specified"}
Budget: ${budget || "Not specified"}
Team Size: ${teamSize || "Not specified"}
Current Stage: ${stage || "Not specified"}
Timeline: ${timeline || "Not specified"}

Rules:
- Be practical and realistic.
- Do not overhype weak ideas.
- If user did not provide optional information, make reasonable assumptions and mention them naturally.
- Scores must be honest.
- Total score must equal the sum of all score fields.
- Use simple professional English.
- Return arrays with useful, specific points.
- Return valid JSON only.

Return JSON exactly in this structure:

{
  "executiveSummary": "",
  "problemValidation": "",
  "customerPersona": "",
  "marketAnalysis": "",
  "competitorAnalysis": "",
  "swotAnalysis": {
    "strengths": ["", "", ""],
    "weaknesses": ["", "", ""],
    "opportunities": ["", "", ""],
    "threats": ["", "", ""]
  },
  "monetizationReview": "",
  "mvpRoadmap": ["", "", "", "", ""],
  "goToMarketStrategy": ["", "", "", ""],
  "riskAnalysis": ["", "", "", ""],
  "techStackSuggestion": ["", "", "", ""],
  "aiUsageSuggestions": ["", "", ""],
  "uniqueAngle": "",
  "investorReadiness": "",
  "finalVerdict": "",
  "score": {
    "problemSeverity": 0,
    "marketPotential": 0,
    "competitionGap": 0,
    "monetization": 0,
    "feasibility": 0,
    "aiAdvantage": 0,
    "investorReadiness": 0,
    "total": 0
  }
}

Score limits:
problemSeverity: 0-15
marketPotential: 0-15
competitionGap: 0-15
monetization: 0-15
feasibility: 0-15
aiAdvantage: 0-10
investorReadiness: 0-15
total: 0-100
`;

  const rawText = await callGeminiWithRetry(prompt);
  const cleanedText = cleanJson(rawText);

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("JSON parse error:", error.message);
    console.error("AI raw response:", cleanedText);

    throw new Error("AI returned invalid JSON. Please try again.");
  }
};