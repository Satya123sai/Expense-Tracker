const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    email:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
    },
    password:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
        
    },
},{timestamps:true})
module.exports=mongoose.model('user',userSchema)