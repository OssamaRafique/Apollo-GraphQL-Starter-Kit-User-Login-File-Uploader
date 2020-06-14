const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    components: [Component!]
  }

  # extend type Mutation {
  #   createComponent(input: InputType!): Component
  # }

  type Component {
    id: ID!
    identifier: String!
    picture: String!
    code: String!
  }
`;