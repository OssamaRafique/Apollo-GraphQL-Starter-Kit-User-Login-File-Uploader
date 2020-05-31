const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

//set env variables
dotEnv.config();

const app = express();

// body parse middlewares
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (_, res)=>{
    res.send("ngLab 🚀GraphQL Server");
})

app.listen(PORT, () => {
    console.log(`🚀🚀🔥🔥Listening at PORT ${PORT} \n URL : http://localhost:${PORT}🔥🔥🚀🚀`);
})