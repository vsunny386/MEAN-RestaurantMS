const jwt = require('jsonwebtoken')
const user = require('../model/userModel')

//Verify tokens
const verifyToken = async(req,res,next)=>{
    try {
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (error) {
        res.status(401).jsonp({ 
            message: 'UnAuthorized',
        })
    }
}



module.exports = verifyToken;