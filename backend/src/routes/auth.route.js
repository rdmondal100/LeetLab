import express from "express"
import { check, login, logout, register } from "../controllers/auth.controller.js"
import { userLoginValidator, userRegisterValidator } from "../validators/index.js"
import authMiddleware from "../middleware/authMiddleware.js"

const authRoutes = express.Router()

authRoutes.post("/register",userRegisterValidator(),register)
authRoutes.post("/login",userLoginValidator(),login)
authRoutes.post("/logout",authMiddleware,logout)
authRoutes.get("/check",authMiddleware,check)


export default authRoutes