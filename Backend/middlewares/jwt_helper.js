const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (userPayload) => {
        return new Promise((resolve, reject)=>{
            const payload = userPayload;
            const secret = process.env.JWT_SEC;
            const options = { expiresIn: '3d' };

            JWT.sign(payload,secret, options, (err, token)=>{
                if(err){
                    console.log(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    }
}