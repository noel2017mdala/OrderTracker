const express = require('express');
const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const port = process.env.PORT || 8000;
const schema = require('./Graphql/Schema')
const rootResolver = require("./Graphql/Resolver");
const AuthMiddleware = require("./middlewares/AuthMiddleware");


const cors = require("cors"); 
require("dotenv/config");
app.use(cors());


app.use(AuthMiddleware);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: rootResolver

}))

app.listen(port, () =>{
    console.log(`Server Started on Port ${port}`)
})