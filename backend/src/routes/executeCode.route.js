
import express from 'express'
import { checkAuthenticated } from '../middleware/authMiddleware.js'
import { runCode, submitCode } from '../controllers/executeCode.controller.js'
import { executeCodeValidator } from '../validators/index.js'

const executionRoutes = express.Router()

executionRoutes.post("/submit-code",executeCodeValidator(),checkAuthenticated,submitCode)
executionRoutes.post("/run-code",executeCodeValidator(),checkAuthenticated,runCode)

export default executionRoutes