const mongoose=require('mongoose')
const db=async()=>{
    try{
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to db")
    }catch(e){
        console.log("connection error to db")
    }
}
module.exports={db}
