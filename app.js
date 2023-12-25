import express from 'express';
import connectDB from './data/database.js';
import {config} from 'dotenv';
import userRouter from './routes/user.js';
import taskRouter from './routes/tasks.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config({
    path: './data/config.env'
});

const app = express();

// Database connection
connectDB();

// Middleware to access req.body data 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

// using user routes
app.use("/api/user",userRouter);
// using task routes
app.use("/api/task",taskRouter);


app.get('/',(req,res) => res.send("<h1>Hello</h1>"));

app.listen(process.env.PORT,()=>{
    console.log("Server Started")
});