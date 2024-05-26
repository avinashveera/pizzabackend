const mongoose=require('mongoose');

const db= mongoose.connect('mongodb+srv://avinashveera77:1234@cluster0.q7j5xpq.mongodb.net/').then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log("database error "+""+ err)
})

module.exports=db