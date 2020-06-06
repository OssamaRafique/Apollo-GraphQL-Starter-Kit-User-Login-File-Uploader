const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { verifyUser } = require('./helper/context')
const { formatError } = require('./helper/formatError')

const { connection } = require('./database/util');


// set env variables
dotEnv.config();

const app = express();

//db connection

connection();

//serve media files

app.use(express.static(__dirname + '/public'));

//cors
app.use(cors());

//run terminal commands
//https://www.npmjs.com/package/node-cmd

// body parser middleware
app.use(express.json());

//apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) =>{
    await verifyUser(req);
    return { email : req.email }
  },
  formatError
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.get('/', (_, res)=>{
  res.send("ngLab 🚀GraphQL Server");
})

app.listen(PORT, () => {
  console.info(`🚀🚀🔥🔥Listening at PORT ${PORT} \n URL : http://localhost:${PORT} \n GraphQL Endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
})