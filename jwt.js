const jwt  = require("jsonwebtoken")

const jwtAuthMiddleware = (req,res,next) =>{
    //first check request header has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:"token not found"})

    //extract the jwt token from request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"unauthorized"})

    try {
        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET,{expiresIn:3000000});
        //Attach user information to the request object
        req.user = decoded
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"Invalid Token"})
    }
}

// function to generate jwt token
const generateToken = (userData) => {
    //generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET)
}

module.exports = {jwtAuthMiddleware,generateToken}