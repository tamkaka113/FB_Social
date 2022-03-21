
import dotenv from 'dotenv'
import express  from "express";
import morgan from "morgan";
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from "cloudinary";
import connectDB from './db/connectDB.js'
dotenv.config()

const app =express()
app.use(express.json())
connectDB()
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true }))
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,

})
app.get('/',(req,res,next)=> {
  
    res.send('this is home page')
})

const PORT =process.env.PORT || 5000

const start =()=> {
    app.listen(PORT, console.log(`Server is running on port ${PORT}`))

}

start()