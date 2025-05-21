import { validationResult } from "express-validator";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../utils/judge0.js";

export const createProblem = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        throw new ApiError(400, "Problem create Validation failed", extractedErrors);
    }



    //  1 -> get all the data from the body
    const { title, description, difficulty, tags, examples, constraints, hints, editorial, testcases, codeSnippet, referenceSolution, } = req.body;


    //  2 -> check the user role if it is admin or not
    if (req.user.role !== "ADMIN") {
        throw new ApiError(403, "You are not allowed to create a problem")
    }
    //  3 -> loop  through each ref solution and

    //extract the language and solutions code from the reference solutions
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
        const languageId = getJudge0LanguageId(language)

        if (!languageId) {
            throw new ApiError(400, `Language ${language} is not supported!`)
        }


        //test case submissions
        const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }))

        const submissionResults = await submitBatch(submissions)
        console.log("Submission in problme controller::", submissionResults)
        const tokens = submissionResults.map((res) => res.token)


        const results = await pollBatchResults(tokens)
        console.log("Get the results from poolbatch in contolller", results)

        for (let i = 0; i < results.length; i++) {
            const result = results[i]
            console.log("Result>>>>>>>>>>", result)
            if (result.status.id !== 3) {
                throw new ApiError(400, `Testcase ${i + 1} failed for language ${language}`)

            }
        }

        const newProblme = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                hints,
                editorial,
                testcases,
                codeSnippet,
                referenceSolution,
                userId: req.user.id
            }
        })
        const response = new ApiResponse(201, newProblme, "New problem created successfully")


        return res
            .status(response.statusCode)
            .json(response)

    }
})



export const getAllProblems = asyncHandler(async (req, res) => {

    const problems = await db.problem.findMany()
    console.log("Got all problems", problems)
    if (!problems) {
        throw new ApiError(404, "No problem found")
    }
    const response = new ApiResponse(200, problems, "Fetched problem successfully")

    return res
        .status(response.statusCode)
        .json(response)

})

export const getProblemById = asyncHandler(async (req, res) => {
    const { id} = req.params;
    if(!id){
        throw new ApiError(404,"Problem id not found")
    }
    const problem = await db.problem.findUnique({
        where: {
            id
        }
    })

    if (!problem) {
        throw new ApiError(404, "Problem not found")
    }

    const response = new ApiResponse(200, problem, "Fetched problem successfully")

    return res
        .status(response.statusCode)
        .json(response)

})


export const updateProblemById = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        throw new ApiError(400, "Problem update Validation failed", extractedErrors);
    }



    const { title, description, difficulty, tags, examples, constraints, hints, editorial, testcases, codeSnippet, referenceSolution, } = req.body;

    const {id} = req.params;
    if(!id){
        throw ApiError(404,"Problem id not found")
    }

    if (req.user.role !== "ADMIN") {
        throw new ApiError(403, "You are not allowed to create a problem")
    }


    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
        const languageId = getJudge0LanguageId(language)

        if (!languageId) {
            throw new ApiError(400, `Language ${language} is not supported!`)
        }

        const submissions = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }))

        const submissionResults = await submitBatch(submissions)
        const tokens = submissionResults.map((res) => res.token)
        const results = await pollBatchResults(tokens)

        for (let i = 0; i < results.length; i++) {
            const result = results[i]
            console.log("Result>>>>>>>>>>", result)
            if (result.status.id !== 3) {
                throw new ApiError(400, `Testcase ${i + 1} failed for language ${language}`)

            }
        }

        const updatedProblem = await db.problem.update({
            where:{
                id
            },
            data:{
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                hints,
                editorial,
                testcases,
                codeSnippet,
                referenceSolution,
                userId: req.user.id
            }
        })
        
        console.log(updatedProblem)

        const response = new ApiResponse(200, updatedProblem, "Problem updated successfully")


        return res
            .status(response.statusCode)
            .json(response)

    }
    
  




    



 })



export const deleteProblemById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const problem = await db.problem.findUnique({
        where:{id}
    })

    if(!problem){
        throw new ApiError(404,"Problem not found")
    }

    await db.problem.delete({where:{id}})

    const response = new ApiResponse(200,null,"Problem deleted Successfully")

    return res 
            .status(response.statusCode)
            .json(response)


 })


export const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => { })