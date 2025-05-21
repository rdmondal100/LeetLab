import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { pollBatchResults, submitBatch } from "../utils/judge0.js";


export const executeCode = asyncHandler(async(req,res , )=>{
    const {source_code, language_id, stdin, expected_outputs, problemId} = req.body

    const userId = req.user.id 

    if(!Array.isArray(stdin) || stdin.length ===0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length){
        throw new ApiError(400,"Invalid or Missing test cases")
    }


    const submissions = stdin.map((input)=>({
        source_code,
        language_id,
        stdin: input
    }))

    const submitResponse = await submitBatch(submissions)
    const tokens = submitResponse.map((res)=>res.token)


    const results = await pollBatchResults(tokens)
    console.log("Result>>>>>>>>",results)

    
})