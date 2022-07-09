import "reflect-metadata";
import dotenv from "dotenv";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { readFileSync } from "fs";
import resolvers from "./resolvers";
import { join } from "path";
import { db } from "./modules/db";
import { RedisPubSub } from "graphql-redis-subscriptions";
// load dotenv file
dotenv.config();

// pubsub client

export const pubsub = new RedisPubSub();

// constructing express server
const app = express();

// creating http server
const httpServer = createServer(app);

// prepareing schema
const schema = makeExecutableSchema({
  typeDefs: readFileSync(join(__dirname, "schema.gql"), "utf-8"),
  resolvers,
});

// creating websocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// applying websocket endpoints(schema) to the web socket server
const ws = useServer({ schema }, wsServer);

// creating apollo server
const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await ws.dispose();
          },
        };
      },
    },
  ],
});

async function main() {
  // database connection
  const connection = await db();

  console.log("db state : ", connection.connection.readyState);

  await server.start();

  server.applyMiddleware({ app });

  httpServer.listen(process.env.PORT, () => {
    console.log("Server started on port 4000");
  });
}

main().catch(console.error);
