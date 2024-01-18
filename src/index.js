// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})

connectDB()

/*
import mongoose from "mongoose";
import express from "express"
const app= express()
;(async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://shree:pass766@avatar.wzumoqe.mongodb.net/vtube`)
        app.on("error",()=>{
            console.log("error: ", error);
            throw error
        })
        app.listen(8000,()=>{
            console.log(`App is listening on port 8000`)
        })
    } catch (error) {
        
    }
})()*/