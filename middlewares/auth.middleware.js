const jwt = require('jsonwebtoken')








function authenticateToken(req,res,next){ 
    const token = req.headers.authorization
    if(!token){
        return res.json({messsage:'No Token Provided'})
    }
    jwt.verify(token,process.env.SECRET_KEY,(error,decoded)=>{
        if(error){
            console.error(error)
            res.json({message:'Invalid Token'})
        }
        req.user = decoded
        next()
})

}

module.exports = authenticateToken