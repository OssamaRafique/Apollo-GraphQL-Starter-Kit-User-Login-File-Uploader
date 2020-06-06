const { gql } = require('apollo-server-express');

const userTypeDefs = require('./user');
const componentTypeDefs = require('./component');

const typeDefs = gql`

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }

  scalar Date
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }`;

module.exports = [
  typeDefs,
  userTypeDefs,
  componentTypeDefs
]

