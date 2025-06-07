const path = require("path");
const express = require("express");
const cors = require("cors");

const app=express();
const PORT=3000;

app.use(express.static( "public"));

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
