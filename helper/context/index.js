const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports.verifyUser = async (req) => {
    try{
        req.email = null;
        const bearerToken = req.headers.auth;
        if(bearerToken){
            const token = bearerToken.split(' ')[1];
            const payload = jwt.verify(token,process.env.JWT_SECRET_KEY || "uguazjlglm");
            req.email = payload.email;
        }
    } catch(error){
        throw new AuthenticationError('Invalid Token');
    }
}