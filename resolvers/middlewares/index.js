const { ForbiddenError } = require('apollo-server-express');
const { skip } = require('graphql-resolvers');

module.exports.isAuthenticated = async (_, __, { email })=>{
    if(!email){
        throw new ForbiddenError('Access Denied, Please login to continue');
    }
    return skip;
}

module.exports.isAdmin = async (_, __, { role })=>{
    if(role!=2){
        throw new ForbiddenError('Access Denied, Only admins can request for this resource.');
    }
    return skip;
}