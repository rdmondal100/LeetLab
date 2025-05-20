import express from "express"
import { check, login, logout, register } from "../controllers/auth.controller.js"
import { userLoginValidator, userRegisterValidator } from "../validators/index.js"
import { checkAuthenticated } from "../middleware/authMiddleware.js"

const authRoutes = express.Router()

authRoutes.post("/register",userRegisterValidator(),register)
authRoutes.post("/login",userLoginValidator(),login)
authRoutes.post("/logout",checkAuthenticated,logout)
authRoutes.get("/check",checkAuthenticated,check)


export default authRoutes