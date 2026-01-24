import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import expressLayout from 'express-ejs-layouts';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import session from "express-session";
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const jwtsecret=process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try { 
        const decoded = jwt.verify(token, jwtsecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

mongoose.connect(process.env.MONGODB_URI).
then(()=>{
  console.log("MongoDB connected successfully");
}).
catch((error)=>{
  console.log(error);
  
})

const dataSchema= new mongoose.Schema({ //schema for data
   title:String,
   body:String,
   description: String,
   createdAt:{
    type:Date,
    default:Date.now()
   },
   updatedAt:{
    type:Date,
    default:Date.now()
   }
})

const USERSCHEMA= new mongoose.Schema({ //schema for user data
  username:String,
  password:String
})

const model_data= mongoose.model("Data",dataSchema); //model 1
const model_user= mongoose.model("User",USERSCHEMA); //model 2

const data= await model_data.find();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl:process.env.MONGODB_URI})
}));

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/");
  }

  try {
    jwt.verify(token, jwtsecret);
    const data = await model_data.find();
    res.render("index", { data });
  } catch (error) {
    return res.redirect("/admin");
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/dashboard",authMiddleware,(req,res)=>{
  res.render("dashboard",{data});
})
app.get("/write/:id",async (req,res)=>{

  const id=req.params.id;
  const Data=await model_data.findById(id);
  res.render("write",{id,Data});

});

app.get("/post/:id",async(req,res)=>{

  try{
    const slug=req.params.id;
    const data=await model_data.findById({_id:slug});
    res.render("post",{data});
  }
   catch(error){
   console.log(error);
   }
   
});

app.get("/admin",(req,res)=>{
  res.render("admin");
})

app.post("/admin",async(req,res)=>{
  const {username,password}=req.body;
  try{

    const user=await model_user.findOne({username});

    if(!user){
      return res.status(401).json({message:"Invalid Credentials ! "});
    }

    const userPass=await bcrypt.compare(password,user.password);

    if(!userPass){
      return res.status(401).json({message:"Invalid Credentials ! "})
    }
   
    const token=jwt.sign({userId:user._id},jwtsecret);
    res.cookie("token",token,{httponly:true});
    res.json({success:true});
  
  }catch(error){
   console.log(error);
   
  }
})
  
app.post("/register",async (req,res)=>{
  const {username,password}=req.body;
  //console.log(username,password);
  const hasedPassword= await bcrypt.hash(password,10);
  
  model_user.create({
    username,password:hasedPassword
  });
})

app.post("/send-text",async(req,res)=>{
  const {id,text}=req.body;
  
  const doc= await model_data.findById(id);
  doc.description=text;

  await doc.save();

})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

