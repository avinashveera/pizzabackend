const mongoose=require('mongoose');

const db= mongoose.connect(process.env.dbUrl).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log("database error "+""+ err)
})

module.exports=db