import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const PORT=3000;

const app=express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/UserInfo").then(()=>{
    console.log("Connected to MongoDB 👍");
}).catch((error)=>{
    console.log(error);
})

const UserSchema_1=mongoose.Schema({  //for user
    name:String,
    username:String,
    email:String,
    password:Number
})

const UserSchema_2=mongoose.Schema({  //for cart data
    name:String,
    price:Number
})

const User= await mongoose.model("Data",UserSchema_1);
const Cart= await mongoose.model("Cart Detail",UserSchema_2);


app.post("/receive",(req,res)=>{  //post request handler for user login

    const user_info=req.body;
    User.create(user_info);
    console.log(user_info);
    res.json({ success: true});
}
   
)

app.post("/cart-data",(req,res)=>{  //post request handler for cart data

    const cart_data=req.body;
    Cart.create(cart_data);
    console.log(cart_data);

})

app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`);
})
