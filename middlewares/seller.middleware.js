const isSeller = async(req,res,next)=>{
    if(req.user.role === 'seller'){
        next()
    }
    else{
        res.status(403).json({
            message:'Unauthorized access'
        })
    }
}


module.exports = {isSeller}