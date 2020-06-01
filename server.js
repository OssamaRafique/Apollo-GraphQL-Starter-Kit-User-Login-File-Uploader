const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloLogExtension } = require('apollo-log');
const cors = require('cors');
const dotEnv = require('dotenv');
const winston = require('winston');

// winston.add(winston.transports.File,{
//   filename: "filename.log"
// });

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

// Add Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

//apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) =>{
    await verifyUser(req);
    return { email : req.email }
  },
  formatError: (err) => {
    logger.error(err);
    console.error(err);
    return err.message;
  },
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 3000;

app.get('/', (_, res)=>{
  res.send("ngLab 🚀GraphQL Server");
})

app.listen(PORT, () => {
  console.info(`🚀🚀🔥🔥Listening at PORT ${PORT} \n URL : http://localhost:${PORT} \n GraphQL Endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
})