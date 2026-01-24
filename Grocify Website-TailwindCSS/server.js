const dotenv=require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose=require("mongoose");

const app=express();
const PORT=3000;

app.use(express.static("public"));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MongoDB connected successfully 👍")
}).catch((error)=>{
    console.log(error);
    
});

const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:Number,
    feedback:String
})

const Usermodel= mongoose.model("Detail",UserSchema);

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"about.html"));
});

app.get("/features",(req,res)=>{
    res.sendFile(path.join(__dirname,"features.html"));
});

app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,"contact.html"));
});

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}` );
    
})

app.post("/send-to-mongo",(req,res)=>{
       const data=req.body;
       Usermodel.create(data).then(()=>{
        console.log("Data sent to MongoDB 👍");
        
       }).catch((error)=>{
        console.log(error);
        
       })
})
