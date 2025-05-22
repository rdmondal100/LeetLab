import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";


export const getAllSubmission = asyncHandler(async(req,res)=>{

    const userId = req.user.id;
    const allSubmission = await db.submission.findMany({
        where:{
            userId
        }
    })

    const response = new ApiResponse(200,allSubmission,"Fetched all submission successfully")

    return res 
            .status(response.statusCode)
            .json(response)
})

export const getSubmissionsForProblem = asyncHandler(async(req,res)=>{

})

export const getSubmissionCountForTheProblem = asyncHandler(async(req,res)=>{

})



