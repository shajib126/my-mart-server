require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/user.route')
app.use(express.json())
app.use(cors({credentials:true}))

app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to my mart'})
})

app.use('/api/user',userRoutes)


const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(port,()=>console.log(`server running in ${port}`))
}).catch((err)=>{
    console.log(err.message);
})

