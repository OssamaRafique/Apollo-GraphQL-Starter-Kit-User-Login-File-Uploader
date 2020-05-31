const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

// set env variables
dotEnv.config();

const app = express();

//cors
app.use(cors());

// body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.get('/', (_, res)=>{
    res.send("ngLab 🚀GraphQL Server");
})

app.listen(PORT, () => {
    console.log(`🚀🚀🔥🔥Listening at PORT ${PORT} \n URL : http://localhost:${PORT} \n GraphQL Endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
})