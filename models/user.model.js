const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    role:{
        type:String,
        enum:['user','seller','admin'],
        default:'user',
        required:true
    }
},{timestamps:true})
//signup
userSchema.statics.signup =async function(name,email,password,image,address){
    if(!name || !email){
        throw new Error('creadential error')
    }
    if(!validator.isEmail(email)){
        throw new Error('Invalid Email address')
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('password should be greater than 8 character')
    }
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password,salt)
    const user = await this.create({
        name,email,password:hashPass,image,address
    })
return user
}

//login
userSchema.statics.login =async function(email,password){
    if(!email || !password){
        throw new Error('All field are required')
    }
    const user = await this.findOne({email})
    if(!user){
        throw new Error('User not found')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw new Error('Creadential error')
    }
    return user
}


module.exports = mongoose.model("User",userSchema)