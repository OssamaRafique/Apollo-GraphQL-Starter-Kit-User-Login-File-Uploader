const User = require('./../database/schema/user');
const bcrypt = require('bcryptjs');
module.exports = {
  Query: {
    users: async () => {
      return await User.find()
    },
    user: async (_, { email }) => {
      const user = await User.findOne({email});
      if(!user){
        throw new Error('User not found');
      }
      return user;
    }
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
    }
  },
}