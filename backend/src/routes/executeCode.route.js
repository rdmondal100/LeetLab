
import express from 'express'
import { checkAuthenticated } from '../middleware/authMiddleware.js'
import { runCode, submitCode } from '../controllers/executeCode.controller.js'
import { executeCodeValidator } from '../validators/index.js'
import validateRequest from '../middleware/validateRequest.js'

const executionRoutes = express.Router()

executionRoutes.post("/submit-code",executeCodeValidator(),validateRequest,checkAuthenticated,submitCode)
executionRoutes.post("/run-code",executeCodeValidator(),validateRequest,checkAuthenticated,runCode)

export default executionRoutes