import { analyzeSubmission } from "../services/agentAnalyzer.service.js";
import { asyncHandler } from "../utils/async-handler.js";

export const codeAnalyzer = asyncHandler(async (req, res) => {
  try {
    const { currentProblemDescription, currentProblemExamples, userCode } =
      req.body;
    console.log(userCode);
    if (!currentProblemDescription || !userCode) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await analyzeSubmission(
      currentProblemDescription,
      currentProblemExamples,
      userCode
    );
    console.log(result);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to analyze submission",
    });
  }
});
