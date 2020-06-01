const { users } = require('../constants');
const User = require('./../database/schema/user');

const bcrypt = require('bcryptjs');

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id)
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
        console.log(error);
        throw error;
      }
    }
  },
}