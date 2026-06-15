 import express from "express";
import core from "cors";
import dotenv from "dotenv";//es6 module import syntax
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const App = express();
App.use(core());

App.get("/",(req,res)=>{
    res.json({message:"Hello World"});
})

 const PORT = process.env.PORT || 5000;

 App.listen(PORT,()=>{
    console.log("app is running PORT 5000")
    
 })



