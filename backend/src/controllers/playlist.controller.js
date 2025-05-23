import { validationResult } from "express-validator";
import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";


export const createPlayList = asyncHandler(async(req,res )=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        throw new ApiError(400, "CreatePlayList Validation failed", extractedErrors);
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

    const response = new ApiResponse(201,playlist,"Playlist created successfully")
    return res 
            .status(response.statusCode)
            .json(response)
})


export const getAllListDetails = asyncHandler(async(req,res )=>{
    const userId = req.user.id
    const playLists = await db.playList.findMany({
        where:{
            userId
        },
        include:{
            problems:{
                include:{
                    problem: true
                }
            }
        }
    })

    const response = new ApiResponse(200,playLists,"Fetched allPlayListDetails successfully")

    return res 
            .status(response.statusCode)
            .json(response)
})


export const getPlayListDetails = asyncHandler(async(req,res )=>{
    const {playListId} = req.params
    const userId = req.user.id;

    const playList = await db.playList.findUnique({
        where:{
            userId,
            playListId
        },
        include:{
            problems:{
                include:{
                    problem: true
                }
            }
        }
    })
    if(!playList){
        throw new ApiError(404,"Playlist not found")
    }

    const response = new ApiResponse(200,playList,"Fetched PlayListDetails successfully")

    return res 
            .status(response.statusCode)
            .json(response)

})


export const addProblemToPlayList = asyncHandler(async(req,res )=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        throw new ApiError(400, "AddProblemToPlayList Validation failed", extractedErrors);
    }

    const {playListId} = req.params
    const {problemIds} = req.body; //can handle multiple probles at a time

    const problemsInPlayList = await db.problemInPlaylist.createMany({
data: problemIds.map((problemId)=>({
    playListId,
    problemId
}))
    })

    const response = new ApiResponse(201,problemsInPlayList,"problemsInPlayList added successfully")

    return res 
            .status(response.statusCode)
            .json(response)
    


})


export const deletePlayList = asyncHandler(async(req,res )=>{
   
    const {playListId} = req.params;

    const deletedPlaylist = await db.playList.delete({
        where:{
            id: playListId
        }
    })

    const response = new ApiResponse(200,deletedPlaylist,"PlayList deleted successfully")

    return res 
            .status(response.statusCode)
            .json(response)
    


})


export const removeProblemFromPlayList = asyncHandler(async(req,res )=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        throw new ApiError(400, "DeletePlayList Validation failed", extractedErrors);
    }

    const {playListId} = req.params;
    const {problemIds} =  req.body;

    const removedProblemsFromPlaylist = await db.problemInPlaylist.deleteMany({
        where:{
            playListId,
            problemId:{
                in: problemIds
            }
        }
    })

    const response = new ApiResponse(201,removedProblemsFromPlaylist,"Problem removed from the playlist successfully")

    return res 
            .status(response.statusCode)
            .json(response)
    
})