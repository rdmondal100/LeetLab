import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"

export const checkAuthenticated = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.jwt;
    
    if(!token){
        throw new ApiError(401,"Unauthorized - No token provided")
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const user = await db.user.findUnique({
        where:{
            id: decoded.id
        },
        select:{
            id: true,
            image: true,
            name: true,
            role: true,
            email: true,
        }
    })

    if(!user){
        throw new ApiError(404,"User not found")
    }

    req.user = user
    next()

})

export const checkAdmin = asyncHandler(async(req,res,next)=>{
    const userId = req.user.id
    if(!userId){
        throw new ApiError(404,"Failed to get userId on req")
    }
    const user = await db.user.findUnique({
        where:{
            id: userId
        },
        select:{
            role: true
        }
    })
    
    if(!user){
        throw new ApiError(404,"Failed to get the user data")
    }

    if(user.role !=="ADMIN"){
        throw new ApiError(403,"Access denied - Admins only")
    }

    next()
})
