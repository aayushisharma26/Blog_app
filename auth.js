const jwt = require("jsonwebtoken")

verifyToken=(req,res,next)=>{
    try{
        var token=req.cookies.jwt
        console.log(token)
        var decode =jwt.verify(token,'Key')
        req.userdata=decode
        console.log(decode)
        next()
    }catch(err){
        console.log(err)
        res.send ({message:'invalid token'})
    }
}

module.exports = verifyToken