import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import Post from "./index";
import Notification from "./notification";
import fp from "fastify-plugin";
const models = { Post, Notification };
const connectDB = async (fastify: FastifyInstance, options: any) => {
  try {
    mongoose.connection.on("connected", () => {
      fastify.log.info("MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
      fastify.log.error(err);
    });
    mongoose.connection.on("disconnected", () => {
      fastify.log.info("MongoDB disconnected");
    });
    const db = await mongoose.connect("mongodb://localhost:27017/graphql", {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    });
    fastify.decorate("db", { models });
  } catch (error) {
    fastify.log.error(error);
  }
};

export default fp(connectDB);
