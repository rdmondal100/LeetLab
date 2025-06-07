import express from "express"
import { check, login, logout, register } from "../controllers/auth.controller.js"
import { userLoginValidator, userRegisterValidator } from "../validators/index.js"
import { checkAuthenticated } from "../middleware/authMiddleware.js"
import validateRequest from "../middleware/validateRequest.js"

const authRoutes = express.Router()

authRoutes.post("/register",userRegisterValidator(),validateRequest,register)
authRoutes.post("/login",userLoginValidator(),validateRequest,login)
authRoutes.post("/logout",checkAuthenticated,logout)
authRoutes.get("/check",checkAuthenticated,check)


export default authRoutes