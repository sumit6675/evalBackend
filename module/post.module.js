const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    name:String,
    body:String,
    device:String,
    userId:String,
})

const Postmodel=mongoose.model("post",postSchema)

module.exports=Postmodel