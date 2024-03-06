const jwt = require("jsonwebtoken")
const jwtPassword= "Course-selling-website-admin"



// Middleware for handling auth
function userMiddleware(req, res, next) {
    const {email,password} = req.headers
    const token = signJwt(email,password)
    

    if(!token) {
        return res.status(401).json({error : "invalid email or password"})
    }


    const verified = verifyJwt(token,jwtPassword)

    if(!verified){
        return res.status(401).json({error : "invalid token"})

    }

    next()
}

function signJwt(email,password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return null;
    }

    if(password < 6){
        return null
    }

    const payload = { email,password }

    const token = jwt.sign(payload ,jwtPassword)
        
        
    return token
}

function verifyJwt(token,jwtPassword) {
    try {
        jwt.verify(token,jwtPassword)
    console.log("password is verified")
    return true

    } catch (error) {
        console.log("some error in your credentials")
        return false
    }
}

function decodeJwt(token) {
  try {
    const decode = jwt.decode(token)
    return decode
  } catch(error){
    console.error("error decoding jwt",error.message)
    return null
  }

}
module.exports = userMiddleware;