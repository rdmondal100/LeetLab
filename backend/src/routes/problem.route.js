
import express from 'express'
import { checkAdmin, checkAuthenticated } from '../middleware/authMiddleware.js'
import { createProblem, deleteProblemById, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblemById } from '../controllers/problem.controller.js'
import {  problemValidator } from '../validators/index.js'

const problemRoutes = express.Router()


problemRoutes.post("/create-problem",problemValidator(),checkAuthenticated,checkAdmin,createProblem)
problemRoutes.get("/get-all-problems",checkAuthenticated,getAllProblems)
problemRoutes.get("/get-problem/:id",checkAuthenticated,getProblemById)
problemRoutes.put("/update-problem/:id",problemValidator(),checkAuthenticated,checkAdmin,updateProblemById)
problemRoutes.delete("/delete-problem/:id",checkAuthenticated,checkAdmin,deleteProblemById)
problemRoutes.get("/get-solved-problems",checkAuthenticated,getAllProblemsSolvedByUser)


export default problemRoutes