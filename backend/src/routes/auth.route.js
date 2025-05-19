import express from "express"
import { check, login, logout, register } from "../controllers/auth.controller.js"
import { userRegisterValidator } from "../validators/index.js"

const authRoutes = express.Router()

authRoutes.post("/register",userRegisterValidator(),register)
authRoutes.post("/login",login)
authRoutes.post("/logout",logout)
authRoutes.get("/check",check)


export default authRoutes