const mongoose=require('mongoose')

const postSchema=mongoose.Schema({

    caption:String,
    imageUrl:{
        public_id:String,
        url:String

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId
        ,ref:"user"

    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    likes:[
        // {
        //   user:{  type:mongoose.Schema.Types.ObjectId,
        //     ref:"user"
        //   }
        // }
    ],

    comments:[
        {
            comment:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            comment:{
                type:String,
                required:true
            },
            
        }
    ]

})


module.exports=mongoose.model('post',postSchema);