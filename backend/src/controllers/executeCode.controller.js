import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { getLanguageName, pollBatchResults, submitBatch } from "../utils/judge0.js";


export const submitCode = asyncHandler(async (req, res,) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body

    const userId = req.user.id

    if (!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length) {
        throw new ApiError(400, "Invalid or Missing test cases")
    }


    const submissions = stdin.map((input) => ({
        source_code,
        language_id,
        stdin: input
    }))

    const submitResponse = await submitBatch(submissions)
    const tokens = submitResponse.map((res) => res.token)


    const results = await pollBatchResults(tokens)

    let allPassed = true
    const detailedResults = results.map((result, idx) => {
        const stdout = result.stdout?.trim() || "";
        const expected_output = expected_outputs[idx]?.trim() || "";
        const statusId = result.status?.id;
        const statusDesc = result.status?.description;
    
        const isPassed = statusId === 3 && stdout === expected_output;
    
        if (!isPassed) {
            allPassed = false;
        }
    
        return {
            testCase: idx + 1,
            passed: isPassed,
            stdout,
            expected: expected_output,
            stderr: result.stderr || null,
            compileOutput: result.compile_output || null,
            status: statusDesc,
            memory: result.memory ? `${result.memory} KB` : undefined,
            time: result.time ? `${result.time} s` : undefined
        }
    })

    console.log("________befoe submsitons result____")
    const submissionResult = await db.submission.create({
        data: {
            userId,
            problemId,
            sourceCode: source_code,
            language: getLanguageName(language_id),
            stdin: stdin.join("\n"),
            stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
            stderr: detailedResults.some((r) => r.stderr) ? JSON.stringify(detailedResults.map((r) => r.stderr)) : null,
            compileOutput: detailedResults.some((r) => r.compileOutput) ? JSON.stringify(detailedResults.map((r) => r.compileOutput)) : null,
            status: allPassed ? "Accepted" : "Wrong Answer",
            memory: detailedResults.some((r) => r.memory) ? JSON.stringify(detailedResults.map((r) => r.memory)) : null,
            time: detailedResults.some((r) => r.time) ? JSON.stringify(detailedResults.map((r) => r.time)) : null,

        }


    })

    console.log("__________Submissions results_______")
    console.log(submissionResult)

    if(allPassed){
        await db.problemSolved.upsert({
            where:{
                userId_problemId:{
                    userId,problemId
                }
            },
            update:{},
            create:{
                userId, problemId
            }
        })
    }

    const testCaseResults = detailedResults.map((result)=>({
        submissionId: submissionResult.id,
        testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compileOutput,
            status: result.status,
            memory: result.memory,
            time: result.time
        
    }))
    console.log(testCaseResults)
    console.log("TEst case result are above")
    await db.testCaseResult.createMany({
        data: testCaseResults
    })

    const submissionWithTestCase = await db.submission.findUnique({
        where:{
            id: submissionResult.id
        },
        include:{
            testCases: true
        }
    })

    const response = new ApiResponse(200,submissionWithTestCase,"Code Executed Successfully")

    return res
            .status(200)
            .json(response)

})

export const runCode = asyncHandler(async(req,res)=>{
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body

    const userId = req.user.id

    if (!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length) {
        throw new ApiError(400, "Invalid or Missing test cases")
    }


    const submissions = stdin.map((input) => ({
        source_code,
        language_id,
        stdin: input
    }))

    const submitResponse = await submitBatch(submissions)
    const tokens = submitResponse.map((res) => res.token)


    const results = await pollBatchResults(tokens)
    console.log("results")
    console.log(results)
    console.log("results")
    let allPassed = true
   
    
    const detailedResults = results.map((result, idx) => {
        const stdout = result.stdout?.trim() || "";
        const expected_output = expected_outputs[idx]?.trim() || "";
        const statusId = result.status?.id;
        const statusDesc = result.status?.description;
    
        const isPassed = statusId === 3 && stdout === expected_output;
    
        if (!isPassed) {
            allPassed = false;
        }
    
        return {
            testCase: idx + 1,
            passed: isPassed,
            stdout,
            expected: expected_output,
            stderr: result.stderr || null,
            compileOutput: result.compile_output || null,
            status: statusDesc,
            memory: result.memory ? `${result.memory} KB` : undefined,
            time: result.time ? `${result.time} s` : undefined
        }
    })
    
   
    console.log("detailedResults")
    console.log(detailedResults)
    const response = new ApiResponse(200,detailedResults,"Code run successfylly")

    return res 
            .status(response.statusCode)
            .json(response)
})