const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// connect to database
connectDB()
  .then(() => {
    app.listen(
      port,
      console.log(
        ` Running a GraphQL API server at: http://localhost:${port}/graphql`
      )
    );
  })
  .catch((error) => console.error(`Cannot connect to database! ${error}`));
