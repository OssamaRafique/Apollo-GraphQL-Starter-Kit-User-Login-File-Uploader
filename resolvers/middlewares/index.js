const { AuthenticationError } = require('apollo-server-express');
const { skip } = require('graphql-resolvers');

module.exports.isAuthenticated = async (_, __, { email })=>{
    if(!email){
        throw new AuthenticationError('Access Denied, Please login to continue');
    }
    return skip;
}