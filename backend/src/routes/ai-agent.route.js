import express from "express";
import { checkAuthenticated } from "../middleware/authMiddleware.js";
import { codeAnalyzer } from "../controllers/ai-agent.controller.js";
  
const aiAgentRouter = express.Router();

// Protected routes
aiAgentRouter.post("/code-analyzer", checkAuthenticated, codeAnalyzer);
 
export default aiAgentRouter;
