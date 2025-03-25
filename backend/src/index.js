
//Import the Express.js framework into your JavaScript file.
//express: This is a fast, unopinionated, minimalist web framework for Node.js. 
// It helps you handle routing, requests, middleware, and more when building web applications or APIs.
import express from "express";
//Is used to load environment variables from a .env 
// file into your Node.js application
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
//This line tells Express to automatically parse incoming JSON requests — 
//and populate req.body with the parsed data.
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port:" + PORT);
    connectDB()
});