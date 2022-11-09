const db = require('./config/database');


 app.listen(process.env.PORT || 5000,()=>{
     console.log(`port is running on ${process.env.PORT}`)
 })
