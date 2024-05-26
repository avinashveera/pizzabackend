const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({

    type:String
})


module.exports=mongoose.model('cart',cartSchema);