const { createToken } = require("../helpers/token.helper")
const User = require("../models/user.model")

const createUser = async(req,res)=>{
    try{
        const {name,email,password,address,image} = req.body
        const user = await User.signup(name,email,password,image,address)
        const token = createToken(user._id)
        res.status(200).json({
            user,
            token
        })

    }catch(err){
        res.status(400).json({error:err.message})
    }
}
const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body
    const user = await User.login(email,password)
    const token = createToken(user._id)
    res.status(200).json({
        user,
        token
    })
    } catch (err) {
        res.status(400).json({error:err.message})
    }
    

}


module.exports = {createUser,loginUser}