
import express from 'express'
import { checkAuthenticated } from '../middleware/authMiddleware.js'
import { getAllSubmission, getSubmissionCountForTheProblem, getSubmissionsForProblem } from '../controllers/submission.controller.js'

const submissionRoutes = express.Router()

submissionRoutes.get("/get-all-submissions", checkAuthenticated, getAllSubmission)

submissionRoutes.get("/get-submission/:problemId", checkAuthenticated, getSubmissionsForProblem)

submissionRoutes.get("/get-submissions-count/:problemId", checkAuthenticated, getSubmissionCountForTheProblem)


export default submissionRoutes