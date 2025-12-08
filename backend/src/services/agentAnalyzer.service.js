import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER },
    timeComplexity: { type: Type.STRING },
    spaceComplexity: { type: Type.STRING },
    critique: { type: Type.STRING },
    improvedCode: { type: Type.STRING },
  },
  required: [
    "score",
    "timeComplexity",
    "spaceComplexity",
    "critique",
    "improvedCode",
  ],
};

export const analyzeSubmission = async (
  currentProblemDescription,
  currentProblemExamples,
  userCode
) => {
  try {
    const modelId = "gemini-2.5-flash";

    const prompt = `
      You are a senior algorithm expert.
      Analyze the following coding solution.

      Problem Description:
      ${currentProblemDescription}
    
      Problem Example: 
      ${
        currentProblemExamples
      },

      User's Solution:
      ${userCode}

     MUST FOLLOW RULES FOR YOU:
      - Respond ONLY with JSON that matches the schema.
      - If there is no scope for improvement or if it applied the best time and space complexity then give the full mark as 100/100
      - Give feedback and suggestion based on the code that is written within the function. Ignore the input taking process.
      - For giving the Optimized solution must follow the indentation rules according to the programming language.

    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};
