const mongoose=require('mongoose');

const incomeSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
        trim:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true
    },
    type:{
        type:String,
        default:"income"
    },
    date:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String ,
        required:true,
        trim:true
    },
    description:{
        type:String,
        
        trim:true
    }
},{timestamps:true})
module.exports=mongoose.model('income',incomeSchema)