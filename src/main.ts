import fastify, { FastifyInstance } from "fastify";
import db from "./config/connect-mongo";
import schema from "./schema";
import resolvers from "./config/resolver";
import AltairFastify from "altair-fastify-plugin";
import mercurius from "mercurius";

const PORT = 4000;
const url = "mongodb://localhost:27017/graphql";

const app = fastify({ logger: true });
app.register(db, { url });
app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  subscription: true,
});
app.register(AltairFastify, {
  /**
   * All these are the defaults.
   */
  path: "/altair",
  baseURL: "/altair/",
  endpointURL: "/graphql",
});

const start = async () => {
  try {
    await app.listen(PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
