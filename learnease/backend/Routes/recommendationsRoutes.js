import express from 'express';
import RecommendationsModel from '../Models/RecommendationsModel.js';

const router=express.Router();

router.get("/getData",async(req,res)=>{
    try{

        const data = await RecommendationsModel.find();
        res.json(data);

    }
    catch(error){
        console.log("Error",error);
    }
})

export default router;