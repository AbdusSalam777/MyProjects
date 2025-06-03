import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import mongoose from 'mongoose';


mongoose.connect(process.env.MONGODB_URI).
then(()=>{
  console.log("MongoDB connected successfully");
}).
catch((error)=>{
  console.log(error);
  
})

const USERSCHEMA= new mongoose.Schema({
   title:String,
   body:String,
   createdAt:{
    type:Date,
    default:Date.now()
   },
   updatedAt:{
    type:Date,
    default:Date.now()
   }
})

const model= await mongoose.model("Data",USERSCHEMA);

//
//const data = [
//    {
//        title: "Understand MongoDB and Mongoose",
//        body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//    },
//    {
//        title: "build real-time, event-driven applications in Node.js",
//        body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//    },
//    {
//        title: "Discover how to use Express.js",
//        body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//    },
//    {
//        title: "Asynchronous Programming with Node.js",
//        body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking operations."
//    },
//    {
//        title: "Learn the basics of Node.js and its architecture",
//        body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//    },
//    {
//        title: "NodeJs Limiting Network Traffic",
//        body: "Learn how to limit network traffic."
//    },
//    {
//        title: "Learn Morgan - HTTP Request logger for NodeJs",
//        body: "Learn Morgan."
//    },
//    {
//        title: "Error Handling in Node.js",
//        body: "Master error handling techniques in Node.js to build robust applications."
//    },
//    {
//        title: "RESTful API Design with Node.js",
//        body: "Learn best practices for designing scalable and maintainable RESTful APIs using Node.js."
//    },
//    {
//        title: "Authentication with JWT in Node.js",
//        body: "Implement secure authentication using JSON Web Tokens (JWT) in Node.js applications."
//    }
//];

//model.insertMany(data).then(()=>{
//  console.log("Data sent successfully");
//  
//}).catch((error)=>{
//  console.log(error);
//  
//})

const PORT = 3000;
const app = express();

app.use(express.static("public"));

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

