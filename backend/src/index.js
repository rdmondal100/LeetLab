import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'


import authRoutes from './routes/auth.route.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Sendnig the response from backend of leetlab")
})

app.use("/api/v1/auth",authRoutes)


app.listen(process.env.PORT, () => { 
    console.log("Server is running on port 8080")
})