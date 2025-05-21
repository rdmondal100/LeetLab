
import express from 'express'
import { checkAdmin, checkAuthenticated } from '../middleware/authMiddleware.js'
import { createProblem, deleteProblemById, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblemById } from '../controllers/problem.controller.js'
import { createProblemValidator } from '../validators/index.js'

const problemRoutes = express.Router()


problemRoutes.post("/create-problem",createProblemValidator(),checkAuthenticated,checkAdmin,createProblem)
problemRoutes.get("/get-all-problems",checkAuthenticated,getAllProblems)
problemRoutes.get("/get-problem/:id",checkAuthenticated,getProblemById)
problemRoutes.put("/update-problem/:id",checkAuthenticated,checkAdmin,updateProblemById)
problemRoutes.delete("/delete-problem/:id",checkAuthenticated,checkAdmin,deleteProblemById)
problemRoutes.get("/get-solved-problems",checkAuthenticated,getAllProblemsSolvedByUser)


export default problemRoutes