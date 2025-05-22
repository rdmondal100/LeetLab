import { validationResult } from "express-validator";
import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";


export const getAllListDetails = asyncHandler(async(req,res )=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        throw new ApiError(400, "Getting AllListDetails Validation failed", extractedErrors);
    }

    const {name,description} = req.body;
    const userId = req.user.id;

    const playlist = await db.playList.create({
data:{
    name,
    description,
    userId
}
    })

    const response = new ApiResponse(200,playlist,"Playlist created successfully")
    return res 
            .status(response.statusCode)
            .json(response)
})


export const getPlayListDetails = asyncHandler(async(req,res )=>{})
export const createPlayList = asyncHandler(async(req,res )=>{})
export const addProblemToPlayList = asyncHandler(async(req,res )=>{})
export const deletePlayList = asyncHandler(async(req,res )=>{})
export const removeProblemFromPlayList = asyncHandler(async(req,res )=>{})