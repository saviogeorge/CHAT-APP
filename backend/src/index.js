
//Import the Express.js framework into your JavaScript file.
//express: This is a fast, unopinionated, minimalist web framework for Node.js. 
// It helps you handle routing, requests, middleware, and more when building web applications or APIs.
import express from "express";
//Is used to load environment variables from a .env 
// file into your Node.js application
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();
//This line tells Express to automatically parse incoming JSON requests — 
//and populate req.body with the parsed data.
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //Allow the cookies and authorizations
  })
);

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
    connectDB()
});