const express=require("express")
const connection=require("./config/db")
const userRouter=require("./routes/user.routes")
const postRouter=require("./routes/post.routes")
const authentication=require("./middlewere/auth.middlewere")
require("dotenv").config()
const cors=require("cors")
const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use("/users",userRouter)
app.use(authentication)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to Social Media App")
})

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to database")
    }catch(err){
        console.log('err :>> ', err);
    }
    console.log(`Server is live at ${process.env.port}`)
})