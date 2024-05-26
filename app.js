const express=require('express');
const app=express()
const dotenv=require('dotenv')
const cart=require('./routes/cart');
const user=require('./routes/user')
const { json } = require('express');
const cookieParser =require('cookie-parser')
const db =require('./config/database');

dotenv.config({path:"./config/.env"})

app.use(json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const PORT=5000

 app.listen(PORT,()=>{

     console.log(`port is running on ${PORT}`)
 })



app.get('/',(req,res)=>{
    console.log("hiiii")
    res.header('Content-Security-Policy', "img-src 'self'");
    res.status(200).json("hello")
})


app.use('/api',cart);
app.use('/api',user)


module.exports=app;