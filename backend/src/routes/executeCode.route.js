
import express from 'express'
import { checkAuthenticated } from '../middleware/authMiddleware.js'
import { executeCode } from '../controllers/executeCode.controller.js'

const executionRoutes = express.Router()

executionRoutes.post("/",checkAuthenticated,executeCode)

export default executionRoutes