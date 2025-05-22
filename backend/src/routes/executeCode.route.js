
import express from 'express'
import { checkAuthenticated } from '../middleware/authMiddleware.js'
import { runCode, submitCode } from '../controllers/executeCode.controller.js'

const executionRoutes = express.Router()

executionRoutes.post("/submit-code",checkAuthenticated,submitCode)
executionRoutes.post("/run-code",checkAuthenticated,runCode)

export default executionRoutes