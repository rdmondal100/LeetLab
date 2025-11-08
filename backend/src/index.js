import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler.js';

import authRoutes from './routes/auth.route.js';
import problemRoutes from './routes/problem.route.js';
import executionRoutes from './routes/executeCode.route.js';
import submissionRoutes from './routes/submission.route.js';
import playlistRoutes from './routes/playlist.route.js';
import profileRoutes from './routes/profile.route.js';

dotenv.config();

const app = express();

// app.use(cors({
//   origin: 'https://www.dsabattle.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
// }));

const allowedOrigins = ['http://localhost:5173', 'https://www.dsabattle.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Sending the response from backend of leetlab");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/profile", profileRoutes);

app.use(globalErrorHandler);

app.listen(process.env.PORT || 8080, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
