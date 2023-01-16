const express=require('express');
const Postmodel=require("../module/post.module")
const postRouter=express.Router();
postRouter.use(express.json())

postRouter.get("/",async(req,res)=>{
    const {device}=req.query
    const {device1,device2}=req.query
   try{
    if(device){
        let data=await Postmodel.find()
        let filterData=data.filter((i)=>{
          return i.device.toLowerCase().includes(device.toLowerCase());
        })
        if(filterData.length>0){
            res.send(filterData)
        }else{
            res.send({"msg":"Data not found"})
        }
    }else if(device1&&device2){
        let data=await Postmodel.find()
        let filterData=data.filter((i)=>{
          return i.device.toLowerCase().includes(device1.toLowerCase()) || i.device.toLowerCase().includes(device2.toLowerCase())
        })
        if(filterData.length>0){
            res.send(filterData)
        }else{
            res.send({"msg":"Data not found"})
        }
    }else{
        const data=await Postmodel.find()
        res.send(data)
    }
   }catch(err){
    console.log('err :>> ', err);
   }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const newpost=new Postmodel(payload)
        await newpost.save()
        res.send("New post created")
    }catch(err){
        console.log('err :>> ', err);
        res.send({"errr":err})
    }
})

postRouter.get("/:id",async(req,res)=>{
    const ID=req.params.id;
    const data=await Postmodel.findById(ID);
    if(data){
        res.send(data)
    }else{
        res.send({"msg":"Data not found"});
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const ID=req.params.id
    const post=await Postmodel.findById(ID)
    const userId=post.userId
    const userId_req=req.body.userId
    try{
        if(userId!==userId_req){
            res.send({"mgg":"You are not allowed to update the post"})
        }else{
            await Postmodel.findByIdAndUpdate({"_id":ID},payload)
            res.send(`Update the post for id ${ID}`)
        }
    }catch(err){
        console.log('err :>> ', err);
    }

})

postRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id;
    const post=await Postmodel.findById(ID)
    const userId=post.userId
    const userId_req=req.body.userId
    try{
       if(userId===userId_req){
        const data=await Postmodel.findById(ID)
        if(data){
            await Postmodel.findByIdAndRemove(ID)
            res.send("Post is deleted successfully")
        }
       }else{
        res.send({"mgg":"You are not allowed to update the post"})
       }
    }catch(err){
       console.log('err :>> ', err);
       res.send({"err":err})
    }
})

module.exports=postRouter