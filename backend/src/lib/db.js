import mongoose from "mongoose"


//This is an async arrow function named connectDB
//async means it will return a promise and you can use await inside it.


export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch (error){
        console.log("MongoDB connection error:", error);
    }
};