const express=require('express');
const app=express()
const dotenv=require('dotenv')
const post=require('./routes/post');
const user=require('./routes/user')
const { json } = require('express');
const cookieParser =require('cookie-parser')


dotenv.config({path:"./config/.env"})

app.use(json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.status(200).json("hello")
})


app.use('/api',post);
app.use('/api',user)


module.exports=app;