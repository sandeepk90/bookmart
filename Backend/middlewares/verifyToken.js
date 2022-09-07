const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            // if (err) res.status(403).json("Token is not valid!");
            if(err){
                // console.log(err);
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }
            req.user = user;
            next();
        })
    }else{
        // return res.status(401).json("You are not authenticated!");
        return next(createError.Unauthorized());
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, (err)=> {
        if(req.user?.id === req.params.id || req.user?.isAdmin){
            next();
        }else {
            return next(err)
            // res.status(403).json("You are not allowed to do that!");
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (req.user?.isAdmin) {
            next();
        } else {
            return next(err)
            // res.status(403).json("You are not allowed to do that!");
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };