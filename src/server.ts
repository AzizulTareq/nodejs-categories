import express from "express";
import { graphqlHTTP } from "express-graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefsArray = loadFilesSync("src/schema/**/*.graphql", {
  extensions: ["graphql"],
});
const typeDefs = mergeTypeDefs(typeDefsArray);

const resolvers = mergeResolvers([
]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import categoryRoutes from "./routes/categoryRoutes";
require("dotenv").config();

import { connectDB } from "./database";

connectDB();

app.use("/api/categories", categoryRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Set to false for production
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
