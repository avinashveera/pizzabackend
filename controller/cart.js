const User= require('../models/user')
const jwt=require('jsonwebtoken')
const { json } = require("express")
const user = require("../models/user")


const addcart=async(req,res)=>{
    try {

        
   const UserId=req.body._id;
   const {img,name,price}=req.body
 
   const ite={
   img:img,
    name:name,
    price:price,
    quantity:1
   }


    User.findOneAndUpdate(
        { _id: UserId }, 
        { $push: { cart: ite } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
         });
     
         const  decoe=req.body._id
         const userCart=await User.findById(decoe)
    // const user=await User.findById(UserId)
 
    // await user.cart.push("ite")
   
    // user.save()

    res.status(200).json({
        success:true,
        cart:userCart.cart
        
    })



        
    } catch (error) {

        res.status(506).json({
            success:false,
            message:error.message
        })
        
    }

}


const removecart=async(req,res)=>{

    const posts=await cart.findById(req.params.id)
i
try {

    if(req.user._id.toString()===posts.owner.toString()){

        
      await cart.findByIdAndDelete(req.params.id)
     
      const User=await user.findById(req.user._id)
       const indx=await User.posts.indexOf(req.params.id)
       User.posts.splice(indx,1)

      User.save()
        res.status(200).json({
            success:true,
            message:"item deleted"
        })
    }else{

        res.status(300).json({
            success:false,
            message:"wrong user"
        })  

}

    
    
} catch (error) {

    res.status(500).json({
        success:false,
        message:error
    })
    
}



}


const showcart=async(req,res)=>{

const  decoe=req.body._id
    const userCart=await User.findById(decoe)
    res.status(200).json({
        success:true,
        message:'user found',
        cart:userCart.cart
    })


    try {


        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error
        })
        
    }

}

module.exports={addcart,removecart,showcart}
