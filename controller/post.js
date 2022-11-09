const  post  = require("../models/post")
const User= require('../models/user')
const jwt=require('jsonwebtoken')
const { json } = require("express")
const user = require("../models/user")
const createPost=async(req,res)=>{
    try {

    const postData={
        caption:req.body.caption,
   
        imageUrl:{
            public_id:req.body.public_id,
            url:req.body.url
        },
        
        owner:req.user._id
    
    }
    
    const PostItem=await post.create(postData)

    const user=await User.findById(req.user._id)

   await user.posts.push(PostItem._id)

   await user.save()
 

    
    res.status(200).json({
        success:true,
        post:user
    })



        
    } catch (error) {

        res.status(506).json({
            success:false,
            message:error.message
        })
        
    }

}


const deletePost=async(req,res)=>{

    const posts=await post.findById(req.params.id)
i
try {

    if(req.user._id.toString()===posts.owner.toString()){

        
      await post.findByIdAndDelete(req.params.id)
     
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


const likeComment=async(req,res)=>{
    
try {
    
    const posts=await post.findById(req.params.itemid) 
   
    if(!posts){
        console.log("not found")
        res.status(404).json({
             success:false,
            message:"not found"
        })
       
    }else{

        if(posts.likes.includes(req.user._id)){

           const indx= posts.likes.indexOf(req.user._id)
            
           posts.likes.splice(indx,1)
           
          await posts.save();

          res.status(200).json({
              success:true,
              message:"unliked"
          })


        }       

else{
            
    posts.likes.push(req.user._id)
    posts.save()
    res.status(200).json({
   success:true,
  message:posts
})
}
        
       
    }


    


} catch (error) {

    res.status(500).json({
        message:"fail",
        err:error
    })
    
}

}


const ShowPost=async(req,res)=>{

   
const  decoe=jwt.decode(req.headers.token)
    const userId=await user.findById(decoe._id)

    const postF=await post.find({
        owner:{
            $in:userId.following
        }
    })

    

    res.status(200).json({
        success:true,
        message:postF
    })


    try {


        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error
        })
        
    }

}

module.exports={createPost,likeComment,deletePost,ShowPost}
