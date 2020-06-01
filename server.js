const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloLogExtension } = require('apollo-log');
const cors = require('cors');
const dotEnv = require('dotenv');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { verifyUser } = require('./helper/context')

const { connection } = require('./database/util');


// set env variables
dotEnv.config();

const app = express();

//db connection

connection();

//cors
app.use(cors());

//run terminal commands
//https://www.npmjs.com/package/node-cmd

// body parser middleware
app.use(express.json());

//apollo server
const extensions = [() => new ApolloLogExtension({
  timestamp: true
})];

const apolloServer = new ApolloServer({
  // extensions,
  typeDefs,
  resolvers,
  context: async ({ req }) =>{
    await verifyUser(req);
    return { email : req.email }
  }
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.get('/', (_, res)=>{
  res.send("ngLab 🚀GraphQL Server");
})

app.listen(PORT, () => {
  console.info(`🚀🚀🔥🔥Listening at PORT ${PORT} \n URL : http://localhost:${PORT} \n GraphQL Endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
})