const express=require('express');
const Usermodel=require("../module/user.module")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const userRouter=express.Router()
userRouter.use(express.json())

userRouter.post("/register",(req,res)=>{
    const {name,email,password,gender}=req.body
    try{
        bcrypt.hash(password, 5,async(err, hash)=> {
            if(err){
                console.log('err :>> ', err);
            }else{
                console.log(hash)
                const user=new Usermodel({email,password:hash,gender,name})
                await user.save()
                res.send("Registered successfully")
            }
        })

    }catch(err){
        console.log('err :>> ', err);
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await Usermodel.find({email})
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, async(err, result)=> {
                if(result){
                    const token=jwt.sign({
                        userId:user[0]._id
                    },'sumit')
                    console.log(token)
                    res.send({"msg":"Login successful","token":token})

                }else{
                    res.send({"msg":"Invalid password"})
                }
            });
        }else{
           res.send({"msg":"Login failed"})
        }

    }catch(err){
        console.log('err :>> ', err);
    }
})


module.exports=userRouter