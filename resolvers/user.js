const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const User = require('./../database/schema/user');
const { isAuthenticated } = require('./middlewares')

module.exports = {
  Query: {
    users: combineResolvers(isAuthenticated, async () => {
      return await User.find()
    }),
    user: combineResolvers(isAuthenticated, async (_, { email }) => {
      const user = await User.findOne({email});
      if(!user){
        throw new Error('User not found');
      }
      return user;
    })
  },
  Mutation: {
    signup: async (_,{ input }) => {
      try{
        const user = await User.findOne({ email : input.email });
        if(user){
          throw new Error('Email Already In Use');
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword});
        return await newUser.save();
      } catch(error){
        throw error;
      }
    },
    login: async (_,{input}) => {
      try{
        const user = await User.findOne({ email : input.email});
        if(!user){
          throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(input.password,user.password);
        if(!isPasswordValid){
          throw new Error('Incorrect Password');
        }
        const secretKey = process.env.JWT_SECRET_KEY || "uguazjlglm";
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "15d" });
        return { token };
      } catch(error){
        throw error;
      }
    }
  },
}