const mongoose=require('mongoose')
const bcrupt=require('bcryptjs')

const userSchema=mongoose.Schema({

    name:{
       type:String,
       required:[true,"enter a name"],

    },
    email:{
    type:String,
    required:[true,"enter a email"],
    unique:[true,"email already exit"]
},
password:{
    type:String,
    required:[true,"please enter a password"],

},

cart:[
   {
    img:String,
    name:String,
    price:Number,
    quantity:Number
   }
],


})

userSchema.pre("save",async function (next){


    if(this.isModified("password")){
       this.password=await bcrupt.hash(this.password,10)
    }

    next()

})



module.exports=mongoose.model('user',userSchema);