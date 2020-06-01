const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    signup(input: SignupInput): User
  }

  input SignupInput{
    name: String!,
    email: String!,
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

`;