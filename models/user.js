const mongoose=require('mongoose')
const bcrupt=require('bcryptjs')

const userSchema=mongoose.Schema({

    name:{
       type:String,
       required:[true,"enter a name"],

    },

    avtar:{
        public_id:String,
        url:String
    },
    email:{
    type:String,
    required:[true,"enter a email"],
    unique:[true,"email already exit"]
},
password:{
    type:String,
    required:[true,"please enter a password"],
    minlength:[6,"please enter 6 letter password"],

},

posts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }
],

followers:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
],

following:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
]

})

userSchema.pre("save",async function (next){


    if(this.isModified("password")){
       this.password=await bcrupt.hash(this.password,10)
    }

    next()

})



module.exports=mongoose.model('user',userSchema);