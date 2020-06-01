const userResolver = require('./user');
const componentResolver = require('./component');
const { GraphQLDateTime } = require('graphql-iso-date');

const customDateScalarResolver = {
  Date: GraphQLDateTime
}
module.exports = [
  customDateScalarResolver,
  userResolver,
  componentResolver
];