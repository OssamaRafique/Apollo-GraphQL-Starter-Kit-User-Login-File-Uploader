const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user(email: String!): User
  }

  extend type Mutation {
    signup(input: SignupInput): User
    login(input: LoginInput): Token
  }

  input SignupInput{
    name: String!
    email: String!
    password: String!
    avatar: Upload!
  }

  input LoginInput{
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String!
    role: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Token {
    token: String!
  }

`;