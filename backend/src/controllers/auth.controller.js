import bcrypt from 'bcryptjs'
import { db } from '../libs/db.js';
import jwt from 'jsonwebtoken'
import { UserRole } from '../generated/prisma/index.js';
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { validationResult } from 'express-validator';




export const register = asyncHandler(async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));

        throw new ApiError(400, "Validation failed", extractedErrors);
    }

    const { email, password, name } = req.body;
    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: UserRole.USER
        }
    })

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" })


    const options = {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

    const response = new ApiResponse(201, {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image
    }, "User created successfully",
    )

    return res
        .status(response.statusCode)
        .cookie("jwt", token, options)
        .json(response)


})
export const login = async (req, res) => {

}
export const logout = async (req, res) => {

}
export const check = async (req, res) => {

}