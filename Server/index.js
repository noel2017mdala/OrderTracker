const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const port = process.env.PORT || 8000;
const schema = require("./Graphql/Schema");
const rootResolver = require("./Graphql/Resolver");
const AuthMiddleware = require("./middlewares/AuthMiddleware");

const cors = require("cors");
require("dotenv/config");



//CORS Configuration
app.options("*", cors());
app.use(
  cors({
    origin: process.env.PRODUCTION,
    credentials: true,
  })
);



app.use(AuthMiddleware);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    //graphiql: true,
    rootValue: rootResolver,
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.PRODUCTION);
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
