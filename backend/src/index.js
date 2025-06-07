import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler.js'

// import authRoutes from './routes/auth.route.js'
// import problemRoutes from './routes/problem.route.js'
// import executionRoutes from './routes/executeCode.route.js'
// import submissionRoutes from './routes/submission.route.js'
// import playlistRoutes from './routes/playlist.route.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'https://www.dsabattle.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors());

app.get("/",(req,res)=>{
    res.send("Sendnig the response from backend of leetlab")
})

//routes
// app.use("/api/v1/auth",authRoutes)
// app.use("/api/v1/problems",problemRoutes)
// app.use("/api/v1/execute-code",executionRoutes)
// app.use("/api/v1/submission",submissionRoutes)
// app.use("/api/v1/playlist",playlistRoutes)



app.use(globalErrorHandler)

app.listen(process.env.PORT, () => { 
    console.log("Server is running on port 8080")
})
