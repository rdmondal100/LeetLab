import { db } from "../libs/db";
import { ApiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";
import jwt from "jsonwebtoken"

const authMiddleware = asyncHandler(async(req,res,next)=>{
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

export default authMiddleware