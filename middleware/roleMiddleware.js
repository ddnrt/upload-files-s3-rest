require('dotenv').config()
const jwt = require('jsonwebtoken')

const roleMiddleware = function(role) {
    return function(req,res,next) {
        if (req.method === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({message: 'No access'})
            }
            req.user = decoded
            next()
        } catch(e) {
            res.status(401).json({message: "Not authorized"})
        }
    }
}

module.exports = roleMiddleware
