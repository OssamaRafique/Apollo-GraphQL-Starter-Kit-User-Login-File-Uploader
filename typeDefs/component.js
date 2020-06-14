const { gql } = require('apollo-server-express');

module.exports = gql`

  extend type Query {
    components: [Component!],
    componentsForSidebar: [ComponentSidebar!]
  }

  extend type Mutation {
    createCategory(input: CategoryInput!): Category
    createComponent(input: ComponentInput!): Component
  }

  #Types

  type Category{
    id: ID!,
    name: String!
    icon: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Component {
    id: ID!
    category: Category!
    thumbnail: String!
    code: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type ComponentSidebar{
    id: ID!
    name: String!
    icon: String!
    components: [Component!]
  }

  #Inputs

  input CategoryInput{
    name: String!
    icon: String!
  }

  input ComponentInput{
    category: String!,
    thumbnail: Upload!
    code: String!
  }
`;