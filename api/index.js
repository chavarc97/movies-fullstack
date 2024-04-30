import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

// cookie parser
app.use(cookieParser());

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`. yellow.bold);
})

// routes 
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})