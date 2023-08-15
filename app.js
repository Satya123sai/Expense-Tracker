require('dotenv').config()
const express=require('express')
const cors=require('cors')
const {db}=require("./db/db")
const incomeSchema=require('./models/incomeModel')
const expenseSchema=require('./models/expenseModel')
const userSchema=require('./models/userModel')
const app=express()
app.use(express.json())
app.use(cors())
const port=process.env.port



//routes

app.post("/add-income",async(req,res)=>{
    
    const {user,title,amount,category,description,date}=req.body;
    console.log("called");
    const income=incomeSchema({
        user,
        title,
        amount,
        category,
        description,
        date
    })
    try{
        if(!title||!amount||!category||!date){
            return res.status(400).json({message:"all fields are required"})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({message:"Amount must be positive"})
        }
        await income.save()
        return res.status(200).json({message:"income Added"})
    }catch(e){
        console.log(e);
        res.status(500).json({message:"server error"})
        

    }
    console.log(income);
})
.post("/get-incomes",async(req,res)=>{
    const {user}=req.body;
    console.log(user);
    try{
        const incomes=await incomeSchema.find({user:user}).sort({createdAt:-1})
        res.status(200).json(incomes)
    }catch(e){
        res.status(500).json({message:"server error"})


    }
})
.delete("/delete-income/:id",async(req,res)=>{
    const {id}=req.params
    console.log(req.params)
    incomeSchema.findByIdAndDelete(id)
    .then((income)=>{
        res.status(200).json({message:"Income deleted"})
    }).catch((e)=>{
        res.status(500).json({message:"Server error"})
    })
})
.post("/add-expense",async(req,res)=>{
    
    const {user,title,amount,category,description,date}=req.body
    const expense=expenseSchema({
        user,
        title,
        amount,
        category,
        description,
        date
    })
    try{
        if(!title||!amount||!category||!date){
            return res.status(400).json({message:"all fields are required"})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({message:"Amount must be positive"})
        }
        await expense.save()
        return res.status(200).json({message:"expense Added"})
    }catch(e){
        res.status(500).json({message:"server error"})

    }
    console.log(expense);
})
.post("/get-expenses",async(req,res)=>{
    const {user}=req.body;
    try{
        const expenses=await expenseSchema.find({user:user}).sort({createdAt:-1})
        res.status(200).json(expenses)
    }catch(e){
        console.log(e);
        res.status(500).json({message:"server error"})


    }
})
.delete("/delete-expense/:id",async(req,res)=>{
    const {id}=req.params
    console.log(req.params)
    expenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message:"Expense deleted"})
    }).catch((e)=>{
        res.status(500).json({message:"Server error"})
    })
})
.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    const user=userSchema({
        name,
        email,
        password
    })
    try{
        const x=await userSchema.find({email:email});
        console.log(x);
        if(x.length>0){
            return res.status(400).json({message:"email alread exist"})
        }
        if(!name||!email||!password){
            return res.status(400).json({message:"all fields are required"})
        }
        await user.save()
        return res.status(200).json({message:"Registered"})
    }catch(e){
        console.log(e);
        res.status(500).json({message:"server error"})

    }
    console.log(user);
})
.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const x=await userSchema.find({email:email,password,password});
    console.log(x)
    if(x.length==1){
        res.status(200).json({message:"Logged in",user:x[0]._id,name:x[0].name});
    }else{
        res.json({message:"wrong credentials"});
    }
})


const server=()=>{
    db()
    app.listen(port,()=>{
        console.log("Hi")
    })
}
server()


