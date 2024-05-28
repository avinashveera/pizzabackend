const express=require('express');
const app=express()
const dotenv=require('dotenv')
const cart=require('./routes/cart');
const user=require('./routes/user')
const { json } = require('express');
const cookieParser =require('cookie-parser')
const db =require('./config/database');
var cors = require('cors');


dotenv.config({path:"./config/.env"})

app.use(json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const PORT=5000

 app.listen(PORT,()=>{

     console.log(`port is running on ${PORT}`)
 })

 app.use(cors());

 app.options("", cors());


 app.use(function (req, res) 
 {
       res.header("Access-Control-Allow-Origin", "");
       res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
       res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, X-CallbackType, Content-Type, Accept");
       res.header("Cache-Control", "no-cache");
 });
 

app.get('/',(req,res)=>{
    console.log("hiiii")
    res.header('Content-Security-Policy', "img-src 'self'");
    res.status(200).json("hello")
})


app.use('/api',cart);
app.use('/api',user)


module.exports=app;