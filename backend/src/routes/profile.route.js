import express from "express";
import { checkAuthenticated } from "../middleware/authMiddleware.js";
import { getUserProfile, getUserStats, updateUserProfile } from "../controllers/profile.controller.js";
 
const profileRoutes = express.Router();

// Protected routes
profileRoutes.get("/", checkAuthenticated, getUserProfile);
profileRoutes.get("/stats", checkAuthenticated, getUserStats);
profileRoutes.put("/", checkAuthenticated, updateUserProfile);

export default profileRoutes;
